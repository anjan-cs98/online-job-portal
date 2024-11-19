const http = require("http");
const startServer = (app) => {
  const server = http.createServer(app);
  server.listen(process.env.PORT || 3000);
  server.on("listening", () => {
    console.log(`Server listening on port ${server.address().port}`);
  });
  server.on("error", (err) => {
    console.log(`Error : ${err}`);
  });
};
module.exports = startServer;
console.log("Server is ready to use");
