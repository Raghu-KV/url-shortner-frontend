import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import * as yup from "yup";

function Home() {
  const [userData, setUserData] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const navigate = useNavigate();

  const getUserData = async () => {
    const localStorageToken = localStorage.getItem("token");

    const responce = await fetch("http://localhost:4000/who-has-logged-in", {
      method: "GET",
      headers: { "x-auth-token": localStorageToken },
    });
    if (responce.status === 401) {
      navigate("/log-in");
    } else {
      const data = await responce.json();
      setUserData(data);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  // console.log(userData);

  const token = localStorage.getItem("token");

  const formik = useFormik({
    initialValues: {
      url: "",
    },
    validationSchema: yup.object({
      url: yup
        .string()
        .matches(
          /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
          "Enter valid url!"
        )
        .required("Please enter a Link!"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      const responce = await fetch(
        `http://localhost:4000/short-this-url/${userData._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
          body: JSON.stringify(values),
        }
      );
      const data = await responce.json();
      setShortUrl(data);
      //console.log(shortUrl);
    },
  });

  return (
    <div className="container mx-auto pt-20">
      <h1 className="text-white text-center text-3xl font-semibold">
        Hi {userData.userName}
      </h1>

      <div className="mt-6 p-3">
        <form
          className="flex justify-center gap-2 text-white"
          onSubmit={formik.handleSubmit}
        >
          <input
            type="text"
            className={`w-full px-3 bg-transparent border-b-2 focus:outline-none focus:border-b-green-600  ${
              formik.touched.url && formik.errors.url
                ? "border-b-red-600"
                : "border-b-white"
            }`}
            name="url"
            value={formik.values.url}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <button
            type="submit"
            className=" px-6 py-3 font-semibold bg-green-600 rounded-lg hover:scale-105 transition-all duration-100"
            disabled={formik.isSubmitting}
          >
            Shrink
          </button>
        </form>
        {formik.touched.url && formik.errors.url && (
          <p className="text-red-500 pt-2 font-semibold">{formik.errors.url}</p>
        )}
      </div>
      <div className="bg-slate-700 px-3 py-4 mx-3 my-5 text-white rounded-lg ">
        {shortUrl.shortUrl ? (
          <a
            href={shortUrl.shortUrl}
            className="font-semibold cursor-pointer text-yellow-400"
            target="_blank"
          >
            {shortUrl.shortUrl}
          </a>
        ) : (
          <span className="opacity-50">your short URL appears here...</span>
        )}
      </div>
    </div>
  );
}

export default Home;
