import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { URL } from "../BackEndURL";

function SignUp() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
      email: "",
    },
    validationSchema: yup.object({
      userName: yup
        .string()
        .min(8, " minimum 8 character required")
        .required(" is required"),

      email: yup.string().email(" should be valid").required(" is required"),
      password: yup
        .string()
        .min(8, " minimum 8 character required")
        .required(" is required"),
    }),
    onSubmit: async (values) => {
      //console.log(values);
      const responce = await fetch(`${URL}/sign-up`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (responce.status === 401) {
        const failData = await responce.json();
        setMessage(failData.message);
      } else {
        const data = await responce.json();
        setMessage(data.message);
      }
    },
  });
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="flex">
        <div className="hidden lg:block lg:w-2/5">
          <img
            src="https://img.freepik.com/premium-vector/vector-landscape-with-beautiful-mountains-lake-with-reflection_460840-880.jpg"
            alt="image"
            className="rounded-l-md bg-left bg-no-repeat"
          />
        </div>
        <div className="w-screen lg:w-3/5 lg:rounded-r-md bg-slate-100 flex flex-col justify-center relative">
          <h2 className="text-center font-bold text-3xl text-slate-800 mt-4">
            Sign Up
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
              htmlFor="email"
              className={`font-medium text-lg ${
                formik.touched.email && formik.errors.email
                  ? "text-red-500"
                  : "text-slate-800"
              }`}
            >
              Email
              <span className="text-sm font-light">
                {formik.touched.email &&
                  formik.errors.email &&
                  formik.errors.email}
              </span>
            </label>
            <input
              type="email"
              id="email"
              className={`block px-3 py-2 mb-10 bg-transparent border-b-4  placeholder-slate-800 placeholder:opacity-50 focus:outline-none focus:border-b-blue-500 w-full text-slate-800 ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : "border-slate-800"
              }`}
              placeholder="Enter your email..."
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            <label
              htmlFor="password"
              className={`font-medium text-lg ${
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
              className={`block px-3 py-2 mb-10 bg-transparent border-b-4  placeholder-slate-800 placeholder:opacity-50 focus:outline-none focus:border-b-blue-500 w-full text-slate-800 ${
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

            <button
              type="submit"
              className="bg-slate-800 px-3 py-2 rounded-md text-lg font-semibold text-white hover:bg-slate-900 duration-200"
              disabled={formik.isSubmitting}
              onClick={() => setMessage("Loading...")}
            >
              Create account
            </button>
            <span className="block lg:ml-4 lg:inline">
              Already have an account{" "}
              <Link to="/log-in" className="font-bold text-blue-500">
                login
              </Link>
            </span>
          </form>
          <p className="absolute bottom-24  lg:bottom-28 left-12 text-red-500">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
