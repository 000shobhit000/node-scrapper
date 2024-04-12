// importing scrapper functions and calling them
const scrapBusinessTodayMarketNews = require("./bt-scrapper");
const scrapMintMarketNews = require("./mint-scrapper");


module.exports = async function scrapAll() {
    await new Promise((resolve) => setTimeout(resolve, 6000));
    scrapBusinessTodayMarketNews();
    scrapMintMarketNews();
}
