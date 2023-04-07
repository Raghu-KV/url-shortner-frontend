import { useEffect, useState } from "react";

function TableOfUrls() {
  const [allUrlData, setaAlUrlData] = useState(null);

  const urlData = async () => {
    const responce = await fetch(
      `http://localhost:4000/url-datas/table-of-urls?userName=raghunandan`
    );
    const data = await responce.json();
    setaAlUrlData(data);
  };

  useEffect(() => {
    urlData();
  }, []);
  console.log(allUrlData);

  return (
    <div>
      <h2 className="text-center text-white font-semibold text-2xl">
        Your URLs
      </h2>
    </div>
  );
}

export default TableOfUrls;
