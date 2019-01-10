import React from "react";
import { Switch, Route } from "react-router-dom";
import BudgetContainer from "./components/BudgetContainer/BudgetContainer";

export default (
  <Switch>
    <Route key={"BudgetContainer"} path="/:id" component={BudgetContainer} />
  </Switch>
);
