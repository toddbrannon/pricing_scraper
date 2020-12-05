const puppeteer = require('puppeteer')
const colors = require('colors');

colors.enable();

async function scrapePriceJMB(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url)

    const [el] = await page.$x('//html/body/div[2]/div[2]/div[2]/div/div[1]/div/div[1]/div[2]/div[3]/div/table[2]/tbody/tr/td[4]')
    const txt = await el.getProperty('textContent')
    const price = await txt.jsonValue()

    console.log("JM Bullion | 2020 1 oz American Silver Eagle BU: ".magenta + price.trim().cyan)
    
    browser.close()
}

scrapePriceJMB('https://www.jmbullion.com/2020-1-oz-american-silver-eagle-coin/')
