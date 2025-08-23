const { chromium } = require('playwright-extra');
const stealth = require('puppeteer-extra-plugin-stealth')();
const path = require('path');

chromium.use(stealth);

(async () => {
  const browser = await chromium.launch({
    headless: process.env.HEADLESS !== 'false',
    args: [
      '--disable-blink-features=AutomationControlled',
      '--disable-features=IsolateOrigins,site-per-process',
    ]
  });
  
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36',
    viewport: { width: 1920, height: 1080 },
    screen: { width: 1920, height: 1080 },
    hasTouch: false,
    recordVideo: process.env.RECORD_VIDEO === 'true' ? {
      dir: 'test-results/video/',
      size: { width: 1920, height: 1080 }
    } : undefined
  });
  
  const page = await context.newPage();
  
  try {
    console.log('Navigating to site...');
    await page.goto('https://elitebot.dev/@JacobsReaper/Peach/charts', {
      waitUntil: 'networkidle',
      timeout: 30000
    });
    
    await page.waitForTimeout(Math.random() * 2000 + 1000);
    
    console.log('Waiting for playName element...');
    const element = await page.waitForSelector('div#playerName');
    const text = await element.textContent();
    
    if (!text.includes('JacobsReaper')) {
      throw new Error(`Expected playerName to be JacobsReaper but got: ${text}`);
    }
    
    console.log('Check passed successfully');
  } catch (error) {
    console.error('Check failed:', error);
    await context.close();
    await browser.close();
    process.exit(1);
  }
  
  await context.close();
  await browser.close();
  process.exit(0);
})();
