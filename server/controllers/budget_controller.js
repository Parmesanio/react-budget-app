module.exports = {
  get: (req, res) => {
    const db = req.app.get("db");
    let { id } = req.params;
    db.get_budget_items(+id).then(items => {
      res.send(items);
    });
  }
};
