import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import * as cheerio from 'cheerio';

puppeteer.use(StealthPlugin());

export async function scrapeAmazon(query: string) {
    const url = `https://www.amazon.in/s?k=${encodeURIComponent(query)}`;
    let browser;
  
    try {
        // browser = await puppeteer.launch({ 
        //     headless: false, // change this to false to see the browser window to open
        //     args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-blink-features=AutomationControlled'] 
        // });

        browser = await puppeteer.launch({ 
            headless: false,
            executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
            args: [
                '--no-sandbox', 
                '--disable-setuid-sandbox',
                '--disable-blink-features=AutomationControlled'
            ] 
        });
    
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
        await page.setExtraHTTPHeaders({
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
            'Upgrade-Insecure-Requests': '1'
        });
      
        // Block heavy resources for speed
        // await page.setRequestInterception(true);
        // page.on('request', (req) => {
        //     if (['image', 'stylesheet', 'font', 'media'].includes(req.resourceType())) {
        //         req.abort();
        //     } else {
        //         req.continue();
        //     }
        // });
    
        // Wait only for the raw HTML to load
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      
        const html = await page.content();
        // await browser.close();
        
        const $ = cheerio.load(html);
        const products: any[] = [];

        $('.s-result-item[data-component-type="s-search-result"]').each((_, el) => {
            const title = $(el).find('.a-size-medium.a-text-normal').text().trim();
            const price = $(el).find('.a-price-whole').text().trim();
            const link = $(el).find('.a-link-normal.a-text-normal').attr('href');

            if (title && price) {
                products.push({
                    platform: 'Amazon',
                    title: title.length > 120 ? title.substring(0, 120) + '...' : title,
                    price: `₹${price}`,
                    link: `https://www.amazon.in${link}`
                });
            }
        });

        return products.slice(0, 3);

    } catch (error) {
        console.error('Amazon scraping failed:', error);
        if (browser) await browser.close();
        return [];
    }finally {
        if (browser) await browser.close();
    }
}