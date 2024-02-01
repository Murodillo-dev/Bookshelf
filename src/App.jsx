import { useEffect, useState } from "react";
import rasm1 from "../src/images/check.png";
import rasm2 from "../src/images/notify.png";
import rasm3 from "../src/images/search.png";
import Create from "./Create";
import axios from "axios";
import { AuthContex } from "./Context";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  //show/hide create component
  const [newData, setNewData] = useState(false);
  function createData() {
    setNewData(true);
  }

  // bring the data
  const [url, setUrl] = useState("http://localhost:3000/book");
  const [api, setApi] = useState([]);
  useEffect(() => {
    axios.get(url).then((response) => {
      setApi(response.data);
    });
  }, [newData]);

  //delete the Items
  function deletedItem(parametr) {
    axios.delete(`${url}/${parametr}`).then(() => {
      setApi((info) => info.filter((value) => value.id !== parametr));
    });
  }

  //edit function
  const [edit, setEdit] = useState(null);
  const [changeInfo, setChangeinfo] = useState("");
  function change(parametr) {
    setEdit(parametr.id);
    setChangeinfo(parametr.title);
  }
  function save() {
    axios
      .patch(`${url}/${edit}`, { title: changeInfo })
      .then(() => {
        setApi((info) =>
          info.map((value) =>
            value.id == edit ? { ...value, title: changeInfo } : value
          )
        );
      })
      .finally(() => {
        setEdit(null);
      });
  }

  //search function
  function searching(e) {
    const searchItem = e.target.value;

    if (searchItem == "") {
      axios.get(url).then((response) => {
        setApi(response.data);
      });
    } 

    else {
      const sortedItem = api.filter((value) =>
        value.title.toLowerCase().includes(searchItem.toLowerCase())
      );
      setApi(sortedItem);
    }
  }

  return (
    <AuthContex.Provider value={{ newData, setNewData }}>
      <div
        style={{
          backgroundImage: "url('../src/Images/background.png') ",
          backgroundSize: "cover",
        }}
        className=" app w-[100vw] h-[100vh] px-[100px] box-border relative overflow-auto"
      >
        <div className=" flex justify-center">
          {newData ? <Create /> : null}
        </div>

        <div className="header pt-3 box-border flex justify-between sticky top-0 z-10 items-center">
          <div className="navbar__left flex justify-start items-center">
            <a href="">
              <img src={rasm1} alt="" />
            </a>
            <h1 className="text-[18px] text-[#6200EE] mx-[22px]">
              Book<font className="text-white ml-[7px]">List</font>
            </h1>
            <a href="">
              <img src={rasm3} alt="" />
            </a>
            <input
              onChange={searching}
              type="text"
              placeholder="Search for any training you want"
              className="w-[260px] h-[48px] bg-transparent ml-[15px] outline-none text-[18px] text-white"
            />
          </div>
          <div className="navbar_right">
            <a href="">
              <img src={rasm2} alt="" />
            </a>
          </div>
        </div>

        <div className="create w-[100%] flex justify-between sticky top-[110px] z-10 mt-[50px] items-center">
          <div className="create__left w-[403px]">
            <h1 className="text-[36px] text-white">
              You’ve got
              <font className="text-[#6200EE] ml-[10px]">
                {api.length > 1 ? api.length + "Books" : api.length + "Book"}
              </font>
            </h1>
            <h3 className="text-[20px] text-white">Your books today</h3>
          </div>
          <div className="create__right">
            <button
              onClick={createData}
              className="w-[180px] h-[40px] bg-[#6200EE] text-white text-[16px] rounded-[5px]"
            >
              + Create a book
            </button>
          </div>
        </div>

        <div className="book flex justify-between flex-wrap">
          {api.map((value) => {
            return (
              <div
                key={value.id}
                className="w-[400px] h-auto p-[32px] box-border bg-white rounded-[12px] mt-[35px] drop-shadow-xl"
              >
                <h1 className="w-80 text-neutral-900 text-base font-extrabold font-['Montserrat'] mb-[10px]">
                  {value.id == edit ? (
                    <input
                      onChange={(e) => setChangeinfo(e.target.value)}
                      value={changeInfo}
                    />
                  ) : (
                    value.title
                  )}
                </h1>
                <a
                  className="w-80 text-zinc-800 text-sm font-normal font-['Mulish'] leading-tight"
                  href=""
                >
                  Link: {value.cover}
                </a>
                <h1 className="w-80 text-zinc-800 text-sm font-normal font-['Mulish'] leading-tight mt-[5px]">
                  Page: {value.page}
                </h1>
                <h1 className="w-80 text-zinc-800 text-sm font-normal font-['Mulish'] leading-tight mt-[5px]">
                  Publish: {value.published}
                </h1>
                <h1 className="w-80 text-zinc-800 text-sm font-normal font-['Mulish'] leading-tight mt-[5px]">
                  Isbn: {value.isbn}
                </h1>
                <h1 className="w-80 text-neutral-900 text-base font-extrabold font-['Montserrat'] mt-[10px]">
                  Author: {value.author}
                </h1>
                <div className="action w-[150px] mt-[15px] flex justify-between">
                  {value.id == edit ? (
                    <button
                      className="w-auto h-auto px-3 py-1 box-border bg-green-500 rounded-[7px]"
                      onClick={save}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="w-auto h-auto px-3 py-1 box-border bg-green-500 rounded-[7px]"
                      onClick={() => change(value)}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="w-auto h-auto px-3 py-1 box-border bg-red-500 ml-[20px] rounded-[7px]"
                    onClick={() => deletedItem(value.id)}
                  >
                    delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AuthContex.Provider>
  );
};

export default App;
