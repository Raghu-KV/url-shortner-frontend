import { useEffect, useState } from "react";
import { useContext } from "react";
import SingleUrlBox from "./SingleUrlBox";
import { useNavigate } from "react-router-dom";

import { allDataContext } from "../Context";
import { URL } from "../BackEndURL";

function TableOfUrls() {
  const [allUrlData, setAllUrlData] = useState(["dummy"]);

  const { userData, getUserData } = useContext(allDataContext);

  const navigate = useNavigate();

  // const getUserData = async () => {
  //   const localStorageToken = localStorage.getItem("token");

  //   const responce = await fetch(`${URL}/who-has-logged-in`, {
  //     method: "GET",
  //     headers: { "x-auth-token": localStorageToken },
  //   });

  //   const data = await responce.json();
  //   setUserData(data);
  //   //console.log(data);
  // };

  // const test = async () => {
  //   // await getUserData();
  //   await urlData();
  // };

  // useEffect(() => {
  //   test();
  // }, []);

  useEffect(() => {
    urlData();
  }, []);
  console.log(userData);

  const urlData = async () => {
    const localStorageToken = localStorage.getItem("token");
    const localStorageUserName = localStorage.getItem("userName");
    await getUserData();
    const responce = await fetch(
      `${URL}/url-datas/table-of-urls?userName=${localStorageUserName}`,
      { method: "GET", headers: { "x-auth-token": localStorageToken } }
    );
    const data = await responce.json();
    setAllUrlData(data);
  };
  console.log(allUrlData);

  //urlData();

  //console.log(allUrlData);

  if (allUrlData[0] === "dummy") {
    return (
      <h2 className="text-center text-white font-semibold text-2xl mb-8">
        Loading...
      </h2>
    );
  } else if (allUrlData.length === 0) {
    return (
      <div>
        <h2 className="text-center text-white font-semibold text-2xl mb-8">
          You don't have any short URls
        </h2>
        <button
          className="px-4 py-2 bg-green-500 mx-auto block rounded-lg font-semibold text-black"
          onClick={() => navigate("/")}
        >
          Create my short URLs
        </button>
      </div>
    );
  }
  return (
    <div>
      <h2 className="text-center text-white font-semibold text-2xl mb-8">
        Your URLs
      </h2>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-4 container mx-auto font-semibold">
        {allUrlData.map((singleUrl) => (
          <SingleUrlBox
            singleUrl={singleUrl}
            urlData={urlData}
            key={singleUrl._id}
          />
        ))}
      </div>
    </div>
  );
}

export default TableOfUrls;
