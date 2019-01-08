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
    db.create_budget_item({ title, amount, color, userId: +userId })
      .then(items => {
        res.send(items);
      })
      .catch(err => console.log(err));
  },
  setBudget: (req, res) => {
    const db = req.app.get("db");
    let { budget } = req.body;

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
      res.send(items);
    });
  },
  editItem: (req, res) => {
    const db = req.app.get("db");
    let { id } = req.params;
    let { userId, title, amount, color } = req.body;
    console.log(id, userId, title, amount, color);
    db.edit_budget_item({ id: +id, user_id: +userId, title, amount, color })
      .then(items => {
        res.send(items);
      })
      .catch(err => console.log("Err in editItem", err));
  }
};
