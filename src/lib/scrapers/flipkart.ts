import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import * as cheerio from 'cheerio';

puppeteer.use(StealthPlugin());

export async function scrapeFlipkart(query: string) {
    const url = `https://www.flipkart.com/search?q=${encodeURIComponent(query)}`;
    let browser; // Declare outside try block to ensure it closes on error
    
    try {
        browser = await puppeteer.launch({ 
            headless: true, // change this to false to see the browser window to open
            args: ['--no-sandbox', '--disable-setuid-sandbox'] 
        });
        
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
        
        // 1. OPTIMIZATION: Block images, CSS, and fonts to speed up loading
        await page.setRequestInterception(true);
        page.on('request', (req) => {
            if (['image', 'stylesheet', 'font', 'media'].includes(req.resourceType())) {
                req.abort();
            } else {
                req.continue();
            }
        });
      
        // 2. FIX: Change waitUntil to 'domcontentloaded'
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
        
        const html = await page.content();
        await browser.close();
        
        const $ = cheerio.load(html);
        const products: any[] = [];

        $('div[data-id]').each((_, el) => {
            let title = $(el).find('._4rR01T, .KzDlHZ, .WKTcLC, .s1Q9rs, .IRpwTa, .CGtC98').first().text().trim();
            if (!title) title = $(el).find('img').first().attr('alt') || '';

            let price = $(el).find('._30jeq3, .Nx9bqj').first().text().trim();
            if (!price) {
                const textContent = $(el).text();
                const priceMatch = textContent.match(/₹[0-9,]+/);
                if (priceMatch) price = priceMatch[0];
            }

            const link = $(el).find('a').first().attr('href');

            if (title && price && link) {
                products.push({
                    platform: 'Flipkart',
                    title: title.length > 120 ? title.substring(0, 120) + '...' : title,
                    price: price,
                    link: link.startsWith('http') ? link : `https://www.flipkart.com${link}`
                });
            }
        });

        return products.slice(0, 3);

    } catch (error) {
        console.error('Flipkart scraping failed:', error);
        if (browser) await browser.close(); // Ensure browser closes even on timeout
        return [];
    }finally {
        if (browser) await browser.close();
    }
}