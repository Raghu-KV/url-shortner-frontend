import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

function PasswordResetLink() {
  const [serverMessage, setServerMessage] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();
  const { token } = useParams();
  console.log(id, token);
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: yup.object({
      password: yup
        .string()
        .min(8, " should be above 7 characters")
        .required(" is required"),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], " must match password")
        .required(" is required"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      const responce = await fetch(
        `http://localhost:4000/forget-password/${id}/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );

      if (responce.status === 401) {
        const data = await responce.json();
        setServerMessage(data.message);
      } else {
        const data = await responce.json();
        setServerMessage(data.message);
        navigate("/log-in");
      }
    },
  });
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className=" w-screen lg:w-2/5 bg-slate-100 rounded-md flex flex-col justify-center relative">
        <h2 className="text-center font-bold text-3xl text-slate-800 mt-4">
          Reset password
        </h2>
        <form className="px-10 my-4" onSubmit={formik.handleSubmit}>
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

          <label
            htmlFor="confirmPassword"
            className={` font-medium text-lg ${
              formik.touched.confirmPassword && formik.errors.confirmPassword
                ? "text-red-500"
                : "text-slate-800"
            }`}
          >
            Conifrm password
            <span className="text-sm font-light">
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword &&
                formik.errors.confirmPassword}
            </span>
          </label>
          <input
            type="password"
            id="ConfirmPassword"
            className={`block px-3 py-2 mb-3   bg-transparent border-b-4   placeholder-slate-800 placeholder:opacity-50 focus:outline-none focus:border-b-blue-500 w-full text-slate-800 ${
              formik.touched.confirmPassword && formik.errors.confirmPassword
                ? "border-red-500"
                : "border-slate-800"
            }`}
            placeholder="Enter your password..."
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <button
            type="submit"
            className="bg-slate-800 px-6 py-2 rounded-md text-lg font-semibold text-white hover:bg-slate-900 duration-200"
            disabled={formik.isSubmitting}
          >
            change password
          </button>
        </form>
        <p className="absolute bottom-7 right-12 text-red-500 font-bold">
          {serverMessage}{" "}
        </p>
      </div>
    </div>
  );
}

export default PasswordResetLink;
