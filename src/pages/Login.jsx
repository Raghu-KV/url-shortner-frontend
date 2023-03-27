import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      userName: yup
        .string()
        .min(8, " minimum 8 character required")
        .required(" is required"),
      password: yup
        .string()
        .min(8, " minimum 8 character required")
        .required(" is required"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      const responce = await fetch("http://localhost:4000/log-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (responce.status === 401) {
        const failData = await responce.json();
        setMessage(failData.message);
      } else {
        const data = await responce.json();
        localStorage.setItem("token", data.token);
        setMessage("");
        navigate("/");
      }
    },
  });
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="flex">
        <div className="hidden lg:block w-2/5">
          <img
            src="https://img.freepik.com/premium-vector/spaceman-outer-space-with-all-stars-planets-illustration_9850-677.jpg"
            alt="image"
            className="rounded-l-md bg-left bg-no-repeat"
          />
        </div>
        <div className="w-screen lg:w-3/5 bg-slate-100 lg:rounded-r-md flex flex-col justify-center relative">
          <h2 className="text-center font-bold text-3xl text-slate-800 mt-4">
            Log In
          </h2>
          <form className="px-10 my-4" onSubmit={formik.handleSubmit}>
            <label
              htmlFor="UserName"
              className={` font-medium text-lg ${
                formik.touched.userName && formik.errors.userName
                  ? "text-red-500"
                  : "text-slate-800"
              }`}
            >
              Username
              <span className="text-sm font-light">
                {formik.touched.userName &&
                  formik.errors.userName &&
                  formik.errors.userName}
              </span>
            </label>
            <input
              type="text"
              id="UserName"
              className={`block px-3 py-2  mb-10 bg-transparent border-b-4   placeholder-slate-800 placeholder:opacity-50 focus:outline-none focus:border-b-blue-500 w-full text-slate-800 ${
                formik.touched.userName && formik.errors.userName
                  ? "border-red-500"
                  : "border-slate-800"
              }`}
              placeholder="Enter your User name..."
              name="userName"
              value={formik.values.userName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            <label
              htmlFor="password"
              className={` font-medium text-lg ${
                formik.touched.password && formik.errors.password
                  ? "text-red-500"
                  : "text-slate-800"
              }`}
            >
              Password
              <span className="text-sm font-light">
                {formik.touched.password &&
                  formik.errors.password &&
                  formik.errors.password}
              </span>
            </label>
            <input
              type="password"
              id="password"
              className={`block px-3 py-2 mb-3   bg-transparent border-b-4   placeholder-slate-800 placeholder:opacity-50 focus:outline-none focus:border-b-blue-500 w-full text-slate-800 ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : "border-slate-800"
              }`}
              placeholder="Enter your password..."
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <p className="mb-7 font-bold text-blue-500">
              <Link to="/forget-password">Forget password</Link>
            </p>
            <button
              type="submit"
              className="bg-slate-800 px-6 py-2 rounded-md text-lg font-semibold text-white hover:bg-slate-900 duration-200"
            >
              Login
            </button>
            <span className="block lg:ml-4 lg:inline">
              Don't have an account{" "}
              <Link to="/sign-up" className="font-bold text-blue-500">
                Sign up
              </Link>
            </span>
          </form>
          <p className="absolute bottom-20 mb-2  left-10 lg:bottom-14 lg:left-10 font-bold text-red-500">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
