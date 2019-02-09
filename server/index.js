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
function ensureLoggedIn(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.status(403).json({ message: "You are not authorized" });
  }
}
app.use(express.static(`${__dirname}/../build`));
massive(process.env.HOST == "localhost" ? process.env.TEST_CONNECTION_STRING : process.env.CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
    console.log("DB Set");
  })
  .catch(err => console.log("Err in Massive", err));
//   --------------- ENDPOINTS
// Budget Endpoints
app.get("/api/budget-items/:id", ensureLoggedIn, budget.get);
app.post("/api/budget-items", ensureLoggedIn, budget.post);
app.post("/api/budget-amount", ensureLoggedIn, budget.setBudget);
app.delete("/api/budget-items/:id", ensureLoggedIn, budget.deleteBudget);
app.put("/api/budget-items/:id", ensureLoggedIn, budget.editItem);
// User Endpoints
app.post("/auth/register", auth.bcryptRegister);
app.post("/auth/login", auth.bcryptLogin);
// Session Endpoints
app.get("/api/guest-data", auth.bcryptGuestLogin);
app.get("/api/user-data", (req, res) => {
  res.send(req.session.user);
});
app.post("/api/user-data", budget.destroySession);
const path = require("path");
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Application running on port PORT`));
