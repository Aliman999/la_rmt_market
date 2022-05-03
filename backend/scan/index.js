'use strict'
const cheerio = require("cheerio");
const puppeteer = require("puppeteer-extra");
const axios = require('axios').default;
const rate = require("../params/rate");

const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const insert = require("../mysql/insert");
const select = require("../mysql/select");
const update = require("../mysql/update");

puppeteer.use(StealthPlugin());

async function scan(refresh = false) {
  axios.get("https://free.currconv.com/api/v7/convert?q=CAD_USD&compact=ultra&apiKey=dcc64457c46af2533525")
    .then(function (response) {
      rate.CAD_USD = response.data.CAD_USD;
    })
    .catch(function (error) {
      console.log(error);
    })

  puppeteer.launch({ 
    headless: true,
    args: [
      '--aggressive-cache-discard',
      '--disable-cache',
      '--disable-application-cache',
      '--disable-offline-load-stale-cache',
    ],
  }).then(async browser => {
    console.log('Running...');
    const page = await browser.newPage();

    await page.goto("https://www.g2g.com/categories/lost-ark-gold?region_id=dfced32f-2f0a-4df5-a218-1e068cfadffa&sort=lowest_price", { waitUntil: 'load', timeout: 0 });
    await page.waitForSelector("div.text-body1.ellipsis-2-lines");

    const dom = await page.$eval('*', (el) => el.innerHTML);
    const $ = cheerio.load(dom);

    const g2g = {
      source: "G2G",
      server: [],
      region: [],
      subRegion: [],
      offer: [],
      price: []
    }

    $("div.text-body1.ellipsis-2-lines").each((i, elem) => {
      let string = elem.children[1].children[0].data.trim().split(" - ");

      g2g.server.push(string[0]);

      string = string[1].split(" ");

      g2g.region.push(string[0]);
      g2g.subRegion.push(string[1]);
    })

    $("div.q-pa-md.bg-light-secondary.row.items-center").each((i, elem) => {
      g2g.offer.push(elem.children[0].children[0].children[0].data.trim().split(" ")[0]);
      g2g.price.push(elem.children[2].children[1].children[0].data.trim());
    })

    /*
    g2g.server.forEach(async (item, i)=>{
      await insert(g2g.source, g2g.server[i], g2g.region[i], g2g.subRegion[i], g2g.offer[i], g2g.price[i]);
    })
    */

    let search = [];

    await getSource(g2g.source).then((result) => {
      search = result;
    });

    if (g2g.server.length != search.length) {
      g2g.server.forEach(async (item, i) => {
        await insert(g2g.source, g2g.server[i], g2g.region[i], g2g.subRegion[i], g2g.offer[i], g2g.price[i]);
      });

      await getSource(g2g.source).then((result) => {
        search = result;
      });
    }


    if(refresh){
      search.forEach((item, i) => {
        const index = g2g.server.indexOf(item.server);

        if (g2g.price[index] != item.price || g2g.offer[index] != item.offer) {
          const stringConcat = (g2g.price[index] != item.price && g2g.offer[index] != item.offer);
          console.log(`Updating ${g2g.source} | ${g2g.server[index]} - ${g2g.region[index]} ${g2g.subRegion[index]} - ${g2g.price[index] != item.price ? "Price Discreprency" : ""}${stringConcat ? " and " : ""}${g2g.offer[index] != item.offer ? "Offer Discreprency" : ""}`);
        }

        console.log(`${g2g.source} - \n\n${g2g.server[index]} - ${g2g.offer[index]} at ${g2g.price[index]} \n\nCOMPARED\n\n ${item.server} - ${item.offer} at ${item.price}`);

        update(g2g.source, g2g.server[index], g2g.offer[index], g2g.price[index]);
      })
    }

    console.log("done");

    browser.close();
  });
}




function getSource(source){
  return new Promise((callback)=>{

    select({ source: source }).then((result, err) => {
      if (err) console.log(err);

      callback(result);
    });
  })
}

module.exports = scan;