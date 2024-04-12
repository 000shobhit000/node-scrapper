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
    $("div.widget-listing").each((index, element) => {
      const title = $(element).find("h2").text().trim();
      const date = $(element).find("span").text().trim().replace(/^Updated\s*:\s*/, '');
      const updatedAt = new Date(date);
      
      const paragraph = $(element).find("p").text().trim();
      const source = "businesstoday.in";

      headlines.push({ title, updatedAt, paragraph, source });
    });

    // console.log("Scraped Headlines:");
    const final = { isFinished: headlines.length == 0, headlines };

    return final;
  } catch (error) {
    console.error("Error scraping headlines:", error);
  }
}

// scrapeHeadlines();

module.exports = async function scrapBusinessTodayMarketNews() {
  let pageNo = 1;

  while (true) {
    let targetUrl = `https://www.businesstoday.in/ajax/load-more-widget?id=${pageNo}&type=story/photo_gallery/video/breaking_news&path=/markets/company-stock`;

    console.log(`Scraping bt-stocks-news page ${pageNo}`);
    const currentPageData = await scrapeHeadlines(targetUrl);
    // pushing the scraped data to the database
    const result = await HeadlinesModel.insertMany(currentPageData.headlines);

    ++pageNo;

    await new Promise((resolve) => setTimeout(resolve, 3000));

    if (currentPageData.isFinished || pageNo > 5000) break;
  }

  return true;
}
