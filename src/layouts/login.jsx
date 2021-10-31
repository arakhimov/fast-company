/* eslint-disable multiline-ternary */
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LoginForm from "../components/ui/loginForm";
import RegisterForm from "../components/ui/registerForm";

const Login = () => {
  const { type } = useParams();
  const [formType, setFormType] = useState(
    type === "register" ? type : "login"
  );

  const handleToggleType = (param) => {
    setFormType((prevState) => (prevState === "login" ? "register" : "login"));
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {formType === "login" ? (
            <>
              <h1>Login</h1>
              <LoginForm />
              <p className="mt-3">
                Already have account?&nbsp;
                <a onClick={() => handleToggleType(formType)} role="button">
                  Sign in
                </a>
              </p>
            </>
          ) : (
            <>
              <h1>Register form</h1>
              <RegisterForm />
              <p className="mt-3">
                Don&apos;t have account?&nbsp;
                <a onClick={() => handleToggleType(formType)} role="button">
                  Sign out
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Login;
