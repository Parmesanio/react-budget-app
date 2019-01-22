import React from "react";
import { Switch, Route } from "react-router-dom";
import BudgetContainer from "./components/BudgetContainer/BudgetContainer";
import Landing from "./components/Landing/Landing";

export default (
  <Switch>
    <Route key={"BudgetContainer"} path="/:id" component={BudgetContainer} />
    <Route exact path="/" component={Landing} />
  </Switch>
);
