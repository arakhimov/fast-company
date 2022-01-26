import React from "react";
import { Route, Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Apploader from "./components/ui/hoc/appLoader";
import NavBar from "./components/ui/navBar";
import ProtectedRoute from "./components/ui/protectedRoute";
import Login from "./layouts/login";
import LogOut from "./layouts/logOut";
import Main from "./layouts/main";
import Users from "./layouts/users";
import history from "./utils/history";

const App = () => {
  return (
    <Router history={history}>
      <ToastContainer />
      <Apploader>
        <NavBar />
        <Route path="/" exact component={Main} />
        <Route path="/login/:type?" component={Login} />
        <ProtectedRoute path="/users/:userId?/:isEdit?" component={Users} />
        <Route path="/logout" component={LogOut} />
      </Apploader>
    </Router>
  );
};

export default App;
