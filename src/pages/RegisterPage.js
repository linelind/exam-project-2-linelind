import React from "react";
import { Navigate } from "react-router-dom";
import RegisterForm from "../components/login/RegisterForm";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import BreadcrumbNav from "../components/layout/BreadcrumbNav";

export default function RegisterPage() {
  document.title = "PlotTwist | Register";

  const [auth] = useContext(AuthContext);

  if (auth) {
    return <Navigate replace to='/feed' />;
  } else {
    return (
      <div className='pageContainer'>
        <BreadcrumbNav path='/' title='Login' current='Edit' />
        <RegisterForm />
      </div>
    );
  }
}
