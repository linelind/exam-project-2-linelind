import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { API_BASE } from "../../constant/api";
import AuthContext from "../../context/AuthContext";

const url = API_BASE + "/social/auth/login";

const schema = yup.object().shape({
  email: yup.string().required("Please enter your registered email").email("Please enter a valid email"),
  password: yup.string().required("Please enter your password"),
});

export default function LoginForm() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const history = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [auth, setAuth] = useContext(AuthContext);

  async function onSubmit(data) {
    setSubmitting(true);

    try {
      const response = await axios.post(url, data);
      setAuth(response.data);
      history("/feed");
      setLoginError(false);
    } catch (error) {
      setLoginError(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='form loginForm'>
      {loginError && <div className='errorMessage'>Wrong email or password pal.</div>}
      <p className='logo logInLogo'>PlotTwist</p>
      <label id='email'>
        Email
        <input {...register("email")} id='email' />
        {errors.email && <span>{errors.email.message}</span>}
      </label>
      <label id='password'>
        Password
        <input {...register("password")} type='password' id='password' />
        {errors.password && <span>{errors.password.message}</span>}
      </label>
      <div className='loginBtnContainer'>
        <button className='cta loginBtn hoverBtn'>Log in</button>
      </div>
      <Link to='/register' className='cta newAccountBtn hoverBtn'>
        Create new account
      </Link>
    </form>
  );
}
