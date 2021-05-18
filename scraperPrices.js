// A web scraper to get pricing on 2020 American Eagle 1 oz. Silver BU coins from several online merchants for price comparison
'use strict'

const puppeteer = require('puppeteer')
const colors = require('colors');

colors.enable();

// GET SPOT PRICES //

async function scrapeSpotPrice(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [el] = await page.$x('/html/body/header/div[1]/div[1]/ul/li[1]/a/div[1]');
    const txt = await el.getProperty('textContent');
    const metal1 = await txt.jsonValue();

    const [el2] = await page.$x('/html/body/header/div[1]/div[1]/ul/li[1]/a/div[2]/span[1]');
    const txt2 = await el2.getProperty('textContent');
    let price1 = await txt2.jsonValue();

    const [el4] = await page.$x('/html/body/header/div[1]/div[1]/ul/li[2]/a/div[1]');
    const txt4 = await el4.getProperty('textContent');
    const metal2 = await txt4.jsonValue();

    const [el5] = await page.$x('/html/body/header/div[1]/div[1]/ul/li[2]/a/div[2]/span[1]');
    const txt5 = await el5.getProperty('textContent');
    let price2 = await txt5.jsonValue();

    console.log({metal1, price1});
    console.log({metal2, price2});

    price1 = price1.substring(1)
    price1 = parseFloat(price1.replace(/,/g, ''))
    price2 = price2.substring(1)
    let goldPrice = Number(price1).toFixed(2)
    let silverPrice = Number(price2).toFixed(2)
    let ratio = (goldPrice/silverPrice).toFixed(0)

    console.log(new Date().toLocaleString("en-US", {timeZone: "America/Chicago"}).bgGreen)
    console.log("Gold Spot: ".yellow + "$".cyan + goldPrice.cyan)
    console.log("Silver Spot: ".blue + "$".green + silverPrice.green)
    console.log("Ratio: ".magenta + ratio.yellow)
    
    browser.close();
}

// GET SILVER COIN PRICES //

async function scrapePriceApmex(url){
    const browser = await puppeteer.launch({headless: true});
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

// async function scrapePriceSDB(url){
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto(url)

//     const [el] = await page.$x('/html/body/div[1]/main/div[3]/div/div[2]/div[3]/table/tbody/tr[1]/td[4]/div/span/span/span')
//     const txt = await el.getProperty('textContent')
//     const price = await txt.jsonValue()

//     console.log("SD Bullion          | 2020 1 oz American Silver Eagle BU: ".yellow + price.trim().cyan)
    
//     browser.close()
// }

async function scrapePriceJMB(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
   
    await page.goto(url)
    
    const [el] = await page.$x('/html/body/div[2]/div[2]/div[2]/div/div/div[1]/div/div[2]/div/div[2]/div/table[2]/tbody/tr[1]/td[4]')
    const txt = await el.getProperty('textContent')
    const price = await txt.jsonValue()

    console.log("JM Bullion          | 2020 1 oz American Silver Eagle BU: ".magenta + price.trim().cyan)
    
    browser.close()
}




function runSpotCheck(){
    scrapeSpotPrice('https://www.apmex.com/');
}


function runPriceCheck(){
    scrapePriceApmex('https://www.apmex.com/product/196100/2020-1-oz-american-silver-eagle-bu')
    scrapePriceProvident('https://www.providentmetals.com/2020-american-eagle-1-oz-silver-coin-bu.html')
    // scrapePriceSDB('https://sdbullion.com/2020-us-american-silver-eagle-coin')
    scrapePriceJMB('https://www.jmbullion.com/2020-1-oz-american-silver-eagle-coin/')
}

// function run25GramCheck(){
//     scrapePriceSDB25Gram('https://sdbullion.com/2-5-gram-gold-bar-random-design')
//     scrapePriceJMB25Gram('https://www.jmbullion.com/2-5-gram-valcambi-gold-bar/')
// }

runSpotCheck();
runPriceCheck();

// run25GramCheck();