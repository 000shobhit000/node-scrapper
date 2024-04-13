const axios = require("axios");
const cheerio = require("cheerio");
const HeadlinesModel = require("../models/headlines");

// const targetUrl = "https://www.businesstoday.in/markets/company-stock";

// const targetUrl = "https://www.businesstoday.in/ajax/load-more-widget?id=447&type=story/photo_gallery/video/breaking_news&path=/markets/company-stock";

async function scrapeHeadlines(targetUrl) {
  try {
    const response = await axios.get(targetUrl);
    const $ = cheerio.load(response.data);

    const headlines = [];
    // Replace 'h2' with the appropriate HTML element containing headlines on the target site
    $("div.listingNew").each((index, element) => {
      const title = $(element).find("div.headlineSec a").text().trim();
      const date = $(element).find("[data-expandedtime]").text().trim();
      const parsedDate = new Date(date);
      const updatedAt = isNaN(parsedDate) ? new Date() : parsedDate;

      const paragraph = null;
      const source = "livemint.com";

      headlines.push({ title, updatedAt, paragraph, source });
    });

    const final = { isFinished: headlines.length == 0, headlines };

    return final;
  } catch (error) {
    console.error("Error scraping headlines:", error);
  }
}

// scrapeHeadlines();

async function scrapMintMarketNews() {
  let pageNo = 1;

  while (true) {
    let targetUrl = `https://www.livemint.com/listing/subsection/market~stock-market-news/${pageNo}`;

    console.log(`Scraping livemint-stocks-news page ${pageNo}`);
    const currentPageData = await scrapeHeadlines(targetUrl);
    // pushing the scraped data to the database
    const result = await HeadlinesModel.insertMany(currentPageData.headlines);

    ++pageNo;

    await new Promise((resolve) => setTimeout(resolve, 3000));

    if (currentPageData.isFinished || pageNo > 5000) break;
  }

  return true;
}

async function scrapMintSinglePage() {
  let pageNo = 1;

  let targetUrl = `https://www.livemint.com/listing/subsection/market~stock-market-news/${pageNo}`;

  console.log(`Scraping livemint-stocks-news page ${pageNo}`);
  const currentPageData = await scrapeHeadlines(targetUrl);
  // pushing the scraped data to the database
  const result = await HeadlinesModel.insertMany(currentPageData.headlines);

  await new Promise((resolve) => setTimeout(resolve, 3000));

  return true;
}

module.exports = {
  scrapMintMarketNews,
  scrapMintSinglePage,
};
