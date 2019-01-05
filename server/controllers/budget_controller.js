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
    let userId = req.session.user[0].id;
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
    db.update_user_budget({ budget, userId: req.session.user[0].id }).then(
      updatedUser => {
        req.session.user = updatedUser[0];
        res.send(req.session.user);
      }
    );
  }
};
