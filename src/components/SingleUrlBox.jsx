import { URL } from "../BackEndURL";

function SingleUrlBox({ singleUrl, urlData }) {
  const localStorageToken = localStorage.getItem("token");
  const deleteData = async (_id) => {
    await fetch(`${URL}/url-datas/${_id}`, {
      method: "DELETE",
      headers: { "x-auth-token": localStorageToken },
    });
    await urlData();
  };

  return (
    <div className="bg-slate-600 p-9 rounded-lg box-border border border-transparent hover:border-white transition-all duration-300 mx-4 md:m-0">
      <h3 className="text-white truncate">Short URL : {singleUrl.shortUrl}</h3>
      <h3 className="text-white truncate my-3">
        Full URL : {singleUrl.fullUrl}
      </h3>
      <h3 className="text-white mb-3">No. of Clicks : {singleUrl.clicks}</h3>
      <a href={singleUrl.shortUrl}>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:scale-105 transition-all duration-100 mr-2">
          Open
        </button>
      </a>
      <button
        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:scale-105 transition-all duration-100 ml-2"
        onClick={() => deleteData(singleUrl._id)}
      >
        Delete
      </button>
    </div>
  );
}

export default SingleUrlBox;
