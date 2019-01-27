module.exports = {
  get: (req, res) => {
    if (req.session.user.guest) {
      res.send(req.session.user.guestBudgetItems);
    } else {
      const db = req.app.get("db");
      let { id } = req.params;
      console.log("get budget items fired", id);

      db.get_budget_items(+id)
        .then(items => {
          res.send(items);
        })
        .catch(err => console.log(err));
    }
  },
  post: (req, res) => {
    let { title, amount, color, spent } = req.body;
    let userId = req.session.user.id;
    if (req.session.user.guest) {
      let newBudgetItem = {
        id: Math.floor(Math.random() * 100000),
        title,
        amount,
        spent,
        color
      };
      req.session.user.guestBudgetItems.push(newBudgetItem);
      res.send(req.session.user.guestBudgetItems);
    } else {
      const db = req.app.get("db");
      db.create_budget_item({ title, amount, color, spent, userId: +userId })
        .then(items => {
          res.send(items);
        })
        .catch(err => console.log(err));
    }
  },
  setBudget: (req, res) => {
    const db = req.app.get("db");
    let { budget } = req.body;
    if (req.session.user.guest) {
      req.session.user.budget = budget;
      res.send(req.session.user);
    } else {
      db.update_user_budget({ budget, userId: req.session.user.id }).then(
        updatedUser => {
          req.session.user = {
            id: updatedUser[0].id,
            username: updatedUser[0].username,
            email: updatedUser[0].email,
            budget: updatedUser[0].budget
          };
          res.send(req.session.user);
        }
      );
    }
  },
  deleteBudget: (req, res) => {
    const db = req.app.get("db");
    let { id } = req.params;
    let { userId } = req.query;
    if (req.session.user.guest) {
      let index = req.session.user.guestBudgetItems.findIndex(
        item => item.id == id
      );
      req.session.user.guestBudgetItems.splice(index, 1);
      res.send(req.session.user.guestBudgetItems);
    } else {
      db.delete_budget_item([id, userId]).then(items => {
        res.send(items);
      });
    }
  },
  editItem: (req, res) => {
    const db = req.app.get("db");
    let { id } = req.params;
    let { userId, title, amount, color, spent } = req.body;
    if (req.session.user.guest) {
      let index = req.session.user.guestBudgetItems.findIndex(
        item => item.id == id
      );
      req.session.user.guestBudgetItems[index] = {
        id: req.session.user.guestBudgetItems[index].id,
        title,
        amount,
        spent,
        color
      };
      res.send(req.session.user.guestBudgetItems);
    } else {
      console.log(id, userId, title, amount, color, spent);
      db.edit_budget_item({ id: +id, user_id: +userId, title, amount, spent, color })
        .then(items => {
          res.send(items);
        })
        .catch(err => console.log("Err in editItem", err));
    }
  },
  destroySession: (req, res) => {
    req.session.destroy();
    res.send("Successfully logged out");
  }
};
