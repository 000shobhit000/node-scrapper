const { CronJob } = require("cron");
const {scrapBtSinglePage} = require('./scrappers/bt-scrapper.js')
const {scrapMintSinglePage} = require('./scrappers/mint-scrapper.js')

// Define your cron job
const superCronJob = CronJob.from({
  cronTime: "0 0 * * 1-5",
  onTick: function () {
    console.log(
      "You will see this message every midnight 00:00 reflecting scheduled cron Job!"
    );
    // Calling sigle page scrapping function in cron job for daily one page scrapping.
    scrapBtSinglePage(),
    scrapMintSinglePage()

  },
  start: true,
  timeZone: "asia/kolkata",
});

module.exports = {
  superCronJob,
};
