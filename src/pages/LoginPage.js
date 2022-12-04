import React from "react";
import { Navigate } from "react-router-dom";
import LoginForm from "../components/login/LoginForm";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

export default function LoginPage() {
  document.title = "PlotTwist | Login";

  const [auth] = useContext(AuthContext);

  if (auth) {
    return <Navigate replace to='/feed' />;
  } else {
    return (
      <div className='pageContainer'>
        <LoginForm />
      </div>
    );
  }
}
