const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy(["/user", "/auth", "/send", "/api"], {
      target: "http://localhost:4000/"
    })
  );
};
