require('dotenv').config();
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const { SheetDatabase } = require('sheets-database');
const fs = require('fs');

const db = new SheetDatabase(process.env._ID);

const getData = async () => {
  try {
    const site_ = process.env.site_;
    let uniqueId = parseInt('0', 10);

    const browser = await puppeteer.launch({ headless: true });
    const site_url = `${site_}${uniqueId}#`;
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.setDefaultTimeout(0);
    await page.setExtraHTTPHeaders({
      'user-agent':
        'Mozilla/5.0 (iPhone; CPU iPhone OS 16_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Mobile/15E148 Safari/604.1',
    });
    console.log('before goto');
    await page.goto(site_url, { waitUntil: 'networkidle0' });
    console.log('after goto');

    await page.close();
    await browser.close();

    return true;
  } catch (error) {
    console.error(`getData error: ${error}`);
  }
};

getData();
