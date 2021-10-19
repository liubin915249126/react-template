import * as React from "react";
import { Router, Route, Switch } from "dva/router";

import LoginComponent from "@/pages/Login/Login";
import MainComponent from "@/components/layout/MainLayout";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" component={LoginComponent} />
        <Route path="/" component={MainComponent} />
      </Switch>
    </Router>
    // </Provider>
  );
}
export default RouterConfig;
