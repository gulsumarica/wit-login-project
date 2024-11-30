import React from "react";
import "./App.css";
import { Login } from "./components/Login";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Success } from "./components/Success";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/success" component={Success} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
