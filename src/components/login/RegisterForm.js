import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { API_BASE } from "../../constant/api";

const schema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Please enter your name")
    .min(3, "You must enter at least 3 characters")
    .matches(/^[a-zA-Z0-9_]+$/, "Special caracters not allowed"),
  email: yup
    .string()
    .trim()
    .required("Please enter an email address")
    .matches(/^[a-zA-Z]+[a-zA-Z0-9_.]+@+(\bstud.noroff.no)$/, "Please enter a stud.noroff.no email"),
  password: yup.string().required("Please enter your first name").min(8, "You must enter at least 8 characters"),
  avatar: yup
    .string()
    .trim()
    .matches(/(http[s]?:\/\/.*\.)(jpg|jpeg|png)/i, { message: "Please enter a valid image url", excludeEmptyString: true }),
  banner: yup
    .string()
    .trim()
    .matches(/(http[s]?:\/\/.*\.)(jpg|jpeg|png)/i, { message: "Please enter a valid image url", excludeEmptyString: true }),
});

export default function RegisterForm() {
  const [submitted, setSubmitted] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [registerError, setRegisterError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const url = API_BASE + "/social/auth/register";
  const history = useNavigate();

  async function onSubmit(data) {
    setSubmitted(true);

    try {
      const response = await axios.post(url, data);
      setUpdated(true);
      setRegisterError(false);

      setTimeout(() => {
        history(`/`);
      }, 1500);
    } catch (error) {
      setRegisterError(true);
    } finally {
      setSubmitted(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='form registerForm'>
      {registerError && <div className='errorMessage'>Well this is awkward. Quick, try again, and we'll pretend this error never happened.</div>}
      {updated && <div className='successMessage'>Welcome to our community!</div>}
      <p className='logo logInLogo'>PlotTwist</p>
      <label id='name'>
        Name *
        <input {...register("name")} id='name' />
        {errors.name && <span>{errors.name.message}</span>}
      </label>
      <label id='email'>
        Email *
        <input {...register("email")} id='email' />
        {errors.email && <span>{errors.email.message}</span>}
      </label>
      <label id='password'>
        Password *
        <input {...register("password")} type='password' id='password' />
        {errors.password && <span>{errors.password.message}</span>}
      </label>
      <label id='avatar'>
        Add avatar image by url
        <input {...register("avatar")} id='avatar' />
        {errors.avatar && <span>{errors.avatar.message}</span>}
      </label>
      <label id='banner'>
        Add banner image by url
        <input {...register("banner")} id='banner' />
        {errors.banner && <span>{errors.banner.message}</span>}
      </label>

      <button className='cta registerBtn hoverBtn'>Register</button>
    </form>
  );
}
