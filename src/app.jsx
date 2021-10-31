import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Login from "./layouts/login";
import Main from "./layouts/main";
import Users from "./layouts/users";

const App = () => (
  <Router>
    <NavBar />
    <Route path="/" exact component={Main} />
    <Route path="/login/:type?" component={Login} />
    <Route path="/users/:userId?/:isEdit?" component={Users} />
  </Router>
);

export default App;
