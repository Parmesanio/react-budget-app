const bcrypt = require("bcrypt"),
  saltRounds = 12;
module.exports = {
  bcryptRegister: (req, res) => {
    const db = req.app.get("db");
    const { username, password, email } = req.body;
    bcrypt.hash(password, saltRounds).then(hashedPassword => {
      db.create_user({ username, email, hashedPassword, budget: 0 })
        .then(newUser => {
          req.session.user = {
            id: newUser[0].id,
            username: newUser[0].username,
            email: newUser[0].email,
            budget: newUser[0].budget
          };
          res.send(req.session.user);
        })
        .catch(error => {
          console.log("error", error);
          res.status(500).json({ message: "Something bad happened! " });
        });
    });
  },
  bcryptLogin: (req, res) => {
    const db = req.app.get("db");
    const { username, password } = req.body;
    db.get_user_by_username([username]).then(users => {
      if (users.length) {
        bcrypt.compare(password, users[0].password).then(passwordsMatched => {
          if (passwordsMatched) {
            req.session.user = {
              id: users[0].id,
              username: users[0].username,
              email: users[0].email,
              budget: users[0].budget
            };
            res.json(req.session.user);
          } else {
            res.status(403).json({ message: "Wrong password" });
          }
        });
      } else {
        res.status(403).json({ message: "That user is not registered" });
      }
    });
  },
  bcryptGuestLogin: (req, res) => {
    req.session.user = {
      id: Math.floor(Math.random() * 100000),
      username: "Guest",
      email: "guest@guest.com",
      budget: 0,
      guest: true,
      guestBudgetItems: []
    };
    res.send(req.session.user);
  }
};
