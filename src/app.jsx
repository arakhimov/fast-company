import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./components/ui/navBar";
import ProtectedRoute from "./components/ui/protectedRoute";
import { AuthProvider } from "./hooks/useAuth";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualityProvider } from "./hooks/useQuality";
import Login from "./layouts/login";
import LogOut from "./layouts/logOut";
import Main from "./layouts/main";
import Users from "./layouts/users";

const App = () => (
  <Router>
    <ToastContainer />
    <AuthProvider>
      <NavBar />
      <Route path="/" exact component={Main} />
      <ProfessionProvider>
        <QualityProvider>
          <Route path="/login/:type?" component={Login} />
          <ProtectedRoute path="/users/:userId?/:isEdit?" component={Users} />
        </QualityProvider>
      </ProfessionProvider>
      <Route path="/logout" component={LogOut} />
    </AuthProvider>
  </Router>
);

export default App;
