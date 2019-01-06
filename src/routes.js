import React from "react";
import { Switch, Route } from "react-router-dom";
import BudgetContainer from "./components/BudgetContainer/BudgetContainer";
import AddBudgetItem from "./components/AddBudgetItem/AddBudgetItem";

export default (
  <Switch>
    {/* <Route path="/budget/create" component={BudgetContainer} /> */}
    <Route key={"BudgetContainer"} path="/:id" component={BudgetContainer} />
  </Switch>
);
