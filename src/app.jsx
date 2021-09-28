import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/login";
import MainPage from "./components/mainPage";
import NavBar from "./components/navBar";
import Users from "./components/users";

const App = () => (
  <Router>
    <NavBar />
    <Route path="/" exact component={MainPage} />
    <Route path="/login" component={Login} />
    <Route path="/users/:userId?" component={Users} />
  </Router>
);

export default App;
