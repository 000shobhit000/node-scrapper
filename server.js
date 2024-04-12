const port = process.env.PORT || 3008;
const app = require("./app");

require("http")
  .createServer(app)
  .listen(port, function () {
    console.info(`Server listening on port ${port}`);
  });