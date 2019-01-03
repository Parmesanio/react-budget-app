const express = require("express"),
  bodyParser = require("body-parser"),
  massive = require("massive"),
  session = require("express-session"),
  budget = require("./controllers/budget_controller"),
  app = express();
require("dotenv").config();

//Middleware
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 3600 * 24 * 7
    }
  })
);
app.use(express.static(`__dirname/../build`));
massive(process.env.CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
    console.log("DB Set");
  })
  .catch(err => console.log("Err in Massive"));
//   --------------- ENDPOINTS
app.get("/api/budget-items/:id", budget.get);
const path = require("path");
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Application running on port PORT`));
