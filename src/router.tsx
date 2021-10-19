import * as React from "react";
import { Router, Route, Switch, RouterProps } from "react-router";

import Login from "@/pages/Login/Login";
import MainComponent from "@/components/layout/MainLayout";

function RouterConfig({ history }:RouterProps ) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={MainComponent} />
      </Switch>
    </Router>
    // </Provider>
  );
}
export default RouterConfig;
