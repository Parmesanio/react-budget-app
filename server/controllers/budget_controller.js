module.exports = {
  get: (req, res) => {
    const db = req.app.get("db");
    let { id } = req.params;
    db.get_budget_items(+id)
      .then(items => {
        res.send(items);
      })
      .catch(err => console.log(err));
  },
  post: (req, res) => {
    const db = req.app.get("db");
    let { title, amount, color } = req.body;
    let userId = req.session.user.id;
    console.log(title, amount, color, +userId);
    db.create_budget_item({ title, amount, color, userId: +userId })
      .then(items => {
        res.send(items);
      })
      .catch(err => console.log(err));
  },
  setBudget: (req, res) => {
    const db = req.app.get("db");
    let { budget } = req.body;
    console.log("budget", budget);
    console.log("user", req.session.user);

    db.update_user_budget({ budget, userId: req.session.user.id }).then(
      updatedUser => {
        req.session.user = updatedUser[0];
        res.send(req.session.user);
      }
    );
  },
  deleteBudget: (req, res) => {
    const db = req.app.get("db");
    let { id } = req.params;
    let { userId } = req.query;
    db.delete_budget_item([id, userId]).then(items => {
      console.log(items);
      res.send(items);
    });
  }
};
