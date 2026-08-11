import { NextResponse } from 'next/server';
import { scrapeAmazon } from '@/lib/scrapers/amazon';
import { scrapeFlipkart } from '@/lib/scrapers/flipkart';
import { normalizeProducts } from '@/lib/ai/normalize';
import { redis } from '@/lib/redis';
import { ratelimit } from '@/lib/ratelimit';

// Reusing your group function
function groupProducts(products: any[]) {
    const grouped = new Map();
    products.forEach((product) => {
        const key = (product.brand && product.model)
            ? `${product.brand.toLowerCase().trim()}-${product.model.toLowerCase().trim()}`
            : product.original_title;

        if (!grouped.has(key)) {
            grouped.set(key, {
                brand: product.brand || 'Unknown',
                model: product.model || 'Unknown',
                color: product.color,
                deals: []
            });
        }

        grouped.get(key).deals.push({
            platform: product.platform,
            price: product.price,
            link: product.link,
            original_title: product.original_title
        });
    });
    return Array.from(grouped.values());
}

// Helper to clean price strings (e.g., "₹24,990" -> 24990) for comparison
const parsePrice = (priceStr: string) => parseInt(priceStr.replace(/[^0-9]/g, ''), 10) || Infinity;

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
    const cacheKey = 'daily_deals';

    // 1. Check Redis for today's deals
    const cachedDeals = await redis.get(cacheKey);
    if (cachedDeals) {
        return NextResponse.json({ success: true, results: cachedDeals, source: 'cache' });
    }

    // Cache Miss: Scrape trending categories
    // We search for broad, high-value keywords to populate the page
    const queries = ['premium smartphones', 'premium headphones', 'top laptops' ];

    const randomQuery = queries[Math.floor(Math.random() * queries.length)];

    try {
        const [amazonResults, flipkartResults] = await Promise.all([
            scrapeAmazon(randomQuery),
            scrapeFlipkart(randomQuery)
        ]);
        
        const allRawResults = [...amazonResults, ...flipkartResults];

        // 3. Normalize & Group using Gemini
        const normalizedResults = await normalizeProducts(allRawResults);
        const groupedResults = groupProducts(normalizedResults);

        // 4. Map the grouped AI data exactly to your UI's schema
        const uiFormattedDeals = groupedResults.map(product => {
            // Find the best price among the deals
            const sortedDeals = product.deals.sort((a: any, b: any) => parsePrice(a.price) - parsePrice(b.price));
            const bestDeal = sortedDeals[0];

            // Determine stores (e.g., "Amazon" or "Amazon & Flipkart")
            const stores = Array.from(new Set(product.deals.map((d: any) => d.platform))).join(' & ');

            return {
                title: `${product.brand !== 'Unknown' ? product.brand : ''} ${product.model !== 'Unknown' ? product.model : bestDeal.original_title.substring(0, 40)}`.trim(),
                category: "Electronics", // You can expand this based on the search query later
                price: bestDeal.price,
                store: stores,
                link: bestDeal.link,
            };
        });

        // 5. Store in Redis for 24 Hours (86400 seconds)
        if (uiFormattedDeals.length > 0) {
            await redis.set(cacheKey, uiFormattedDeals, { ex: 86400 });
        }

        return NextResponse.json({ success: true, results: uiFormattedDeals, source: 'live' });

    } catch (error) {
        console.error("Failed to fetch hot deals:", error);
        return NextResponse.json({ error: 'Failed to fetch deals' }, { status: 500 });
    }
}