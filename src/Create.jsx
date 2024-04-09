import React, { useContext, useState } from "react";
import { AuthContex } from "./Context";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Create = () => {
  const [url, setUrl] = useState("http://localhost:3000/book");
  const { newData, setNewData } = useContext(AuthContex);

  const [nomi, setNomi] = useState("");
  const [link, setLink] = useState("");
  const [safiha, setSafiha] = useState("");
  const [yil, setYil] = useState("");
  const [isbn, setIsbn] = useState("");
  const [aftor, setAftor] = useState("");

  function save() {
    if (nomi !== '' && link !== '' && safiha !== '' && yil !== '' && isbn !== '' && aftor !== '') {
      axios
        .post(url, {
          title: nomi,
          cover: link,
          page: safiha,
          published: yil,
          isbn: isbn,
          author: aftor,
        })
        .finally(() => {
          setNewData(false);
          toast("New Book added succesfully")
        });
    }
  }

  function exit() {
    setNewData(false)
  }

  return (
    <div className="w-[400px] h-auto p-[32px] box-border bg-white rounded-[12px] mt-[35px] drop-shadow-xl flex justify-center flex-wrap absolute z-10">
      <i onClick={exit} class="fa-solid fa-circle-xmark"></i>
      <input
        className="w-[100%] px-[8px] pt-[8px] pb-[3px] outline-none text-[18px] border-b-[2px] mt-[4px]"
        type="text"
        onChange={(e) => setNomi(e.target.value)}
        placeholder="title"
      />
      <input
        className="w-[100%] px-[8px] pt-[8px] pb-[3px] outline-none text-[18px] border-b-[2px] mt-[4px]"
        type="text"
        onChange={(e) => setLink(e.target.value)}
        placeholder="link to download"
      />
      <input
        className="w-[100%] px-[8px] pt-[8px] pb-[3px] outline-none text-[18px] border-b-[2px] mt-[4px]"
        type="text"
        onChange={(e) => setSafiha(e.target.value)}
        placeholder="page"
      />
      <input
        className="w-[100%] px-[8px] pt-[8px] pb-[3px] outline-none text-[18px] border-b-[2px] mt-[4px]"
        type="text"
        onChange={(e) => setYil(e.target.value)}
        placeholder="published year"
      />
      <input
        className="w-[100%] px-[8px] pt-[8px] pb-[3px] outline-none text-[18px] border-b-[2px] mt-[4px]"
        type="text"
        onChange={(e) => setIsbn(e.target.value)}
        placeholder="isbn"
      />
      <input
        className="w-[100%] px-[8px] pt-[8px] pb-[3px] outline-none text-[18px] border-b-[2px] mt-[4px]"
        type="text"
        onChange={(e) => setAftor(e.target.value)}
        placeholder="Author"
      />
      <button
        onClick={save}
        className="w-[180px] h-[40px] bg-[#6200EE] text-white text-[16px] rounded-[5px] mt-[20px]"
      >
        Save
      </button>

      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
    </div>
  );
};

export default Create;
