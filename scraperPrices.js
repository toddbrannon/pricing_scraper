// A web scraper to get pricing on 2020 American Eagle 1 oz. Silver BU coins from several online merchants for price comparison

const puppeteer = require('puppeteer')
const colors = require('colors');

colors.enable();

async function scrapePriceApmex(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url)

    const [el] = await page.$x('/html/body/main/div/div[1]/section/div[2]/div[2]/table/tbody/tr[1]/td[4]')
    const txt = await el.getProperty('textContent')
    const price = await txt.jsonValue()

    console.log("APMEX               | 2020 1 oz American Silver Eagle BU: ".green + price.cyan)
    
    browser.close()
}

async function scrapePriceProvident(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url)

    const [el] = await page.$x('/html/body/div[2]/div/div[1]/div[1]/div[1]/div/div[2]/div[2]/div/div/table/tbody/tr/td[4]')
    const txt = await el.getProperty('textContent')
    const price = await txt.jsonValue()

    console.log("Provident           | 2020 1 oz American Silver Eagle BU: ".blue + price.trim().cyan)
    
    browser.close()
}

async function scrapePriceSDB(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url)

    const [el] = await page.$x('/html/body/div[1]/main/div[3]/div/div[2]/div[3]/table/tbody/tr[1]/td[4]/div/span/span/span')
    const txt = await el.getProperty('textContent')
    const price = await txt.jsonValue()

    console.log("SD Bullion          | 2020 1 oz American Silver Eagle BU: ".yellow + price.trim().cyan)
    
    browser.close()
}

async function scrapePriceJMB(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url)

    const [el] = await page.$x('//html/body/div[2]/div[2]/div[2]/div/div[1]/div/div[1]/div[2]/div[3]/div/table[2]/tbody/tr/td[4]')
    const txt = await el.getProperty('textContent')
    const price = await txt.jsonValue()

    console.log("JM Bullion          | 2020 1 oz American Silver Eagle BU: ".magenta + price.trim().cyan)
    
    browser.close()
}

function runPriceCheck(){
    scrapePriceApmex('https://www.apmex.com/product/196100/2020-1-oz-american-silver-eagle-bu')
    scrapePriceProvident('https://www.providentmetals.com/2020-american-eagle-1-oz-silver-coin-bu.html')
    scrapePriceSDB('https://sdbullion.com/2020-us-american-silver-eagle-coin')
    scrapePriceJMB('https://www.jmbullion.com/2020-1-oz-american-silver-eagle-coin/')
}

runPriceCheck();