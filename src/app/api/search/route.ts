import { NextResponse } from "next/server";
import { scrapeAmazon } from "@/lib/scrapers/amazon";
import { scrapeFlipkart } from "@/lib/scrapers/flipkart";
import { normalizeProducts } from "@/lib/ai/normalize";
import { redis } from "@/lib/redis";
import { ratelimit } from '@/lib/ratelimit';

function groupProducts(products: any[]) {
    const grouped = new Map();
    products.forEach((product) => {
        const key =
            product.brand && product.model
                ? `${product.brand.toLowerCase().trim()}-${product.model.toLowerCase().trim()}`
                : product.original_title;

        if (!grouped.has(key)) {
            grouped.set(key, {
                brand: product.brand || "Unknown",
                model: product.model || "Unknown",
                color: product.color,
                deals: [],
            });
        }

        grouped.get(key).deals.push({
            platform: product.platform,
            price: product.price,
            link: product.link,
            original_title: product.original_title,
        });
    });
    return Array.from(grouped.values());
}

export async function GET(request: Request) {
    // Get the user's IP address (works on Vercel/most edge platforms)
    // const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
    const ip = request.headers.get("x-vercel-forwarded-for") || request.headers.get("x-forwarded-for") || "127.0.0.1";

    // 2. Check the rate limit
    const { success, limit, reset, remaining } = await ratelimit.limit(`ratelimit_${ip}`);

    if (!success) {
        return NextResponse.json(
            { error: "Too many requests. Please try again in a minute." },
            {
                status: 429,
                headers: {
                    "X-RateLimit-Limit": limit.toString(),
                    "X-RateLimit-Remaining": remaining.toString(),
                    "X-RateLimit-Reset": reset.toString(),
                }
            }
        );
    }
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query) {
        return NextResponse.json(
            { error: "Search query is required" },
            { status: 400 },
        );
    }
    if (query.length > 100) {
        return NextResponse.json({ error: "Query too long" }, { status: 400 });
    }
    // Remove special characters to prevent malicious payloads
    const sanitizedQuery = query.replace(/[^a-zA-Z0-9\s-]/g, '').trim();

    // --- CACHE CHECK ---
    const cacheKey = `search:${sanitizedQuery.toLowerCase().trim()}`;
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
        console.log(`Cache HIT for query: ${sanitizedQuery}`);
        return NextResponse.json({
            success: true,
            results: cachedData,
            source: "cache", // Helpful for debugging
        });
    }

    // Cached data is not found so try fetching new data
    console.log(`Cache MISS for query: ${sanitizedQuery}. Booting scrapers...`);

    // 1. Scrape raw data
    const [amazonResults, flipkartResults] = await Promise.all([
        scrapeAmazon(sanitizedQuery),
        scrapeFlipkart(sanitizedQuery),
    ]);

    const allRawResults = [...amazonResults, ...flipkartResults];

    // Pass to Gemini for normalization
    const normalizedResults = await normalizeProducts(allRawResults);

    // Group the identical products
    const groupedResults = groupProducts(normalizedResults);

    // --- SAVE TO CACHE ---
    // Save the result to Redis and set it to expire in 3600 seconds (1 hour)
    if (groupedResults.length > 0) {
        await redis.set(cacheKey, groupedResults, { ex: 3600 });
    }

    // Return the fresh data
    return NextResponse.json({
        success: true,
        results: groupedResults,
        source: "live",
    });
}
