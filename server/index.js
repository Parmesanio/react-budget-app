const express = require("express"),
  bodyParser = require("body-parser"),
  massive = require("massive"),
  session = require("express-session"),
  budget = require("./controllers/budget_controller"),
  auth = require("./controllers/auth_controller"),
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
// Budget Endpoints
app.get("/api/budget-items/:id", budget.get);

// User Endpoints
app.get("/auth/callback", auth.auth0);
// Session Endpoints
app.get("/api/user-data", (req, res) => {
  res.send(req.session.user);
});
const path = require("path");
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Application running on port PORT`));
