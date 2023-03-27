import { Link } from "react-router-dom";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function ForgetPassword() {
  const [severMessage, setServrtMessage] = useState("");
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: yup.object({
      email: yup.string().email(" should be valid").required(" is required"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      const responce = await fetch("http://localhost:4000/forget-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (responce.status === 401) {
        const message = await responce.json();
        setServrtMessage(message.message);
      } else {
        const data = await responce.json();
        setServrtMessage(data.message);
        console.log(data);
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
            htmlFor="email"
            className={` font-medium text-lg ${
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
            className={`block px-3 py-2 mb-3   bg-transparent border-b-4   placeholder-slate-800 placeholder:opacity-50 focus:outline-none focus:border-b-blue-500 w-full text-slate-800 ${
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

          <button
            type="submit"
            className="bg-slate-800 px-6 py-2 rounded-md text-lg font-semibold text-white hover:bg-slate-900 duration-200"
            disabled={formik.isSubmitting}
            onClick={() => setServrtMessage("Loading...")}
          >
            Submit
          </button>
        </form>
        <p className="absolute bottom-6 left-40 text-red-500">
          {severMessage}{" "}
        </p>
      </div>
    </div>
  );
}

export default ForgetPassword;
