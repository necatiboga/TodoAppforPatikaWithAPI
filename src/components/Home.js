import React, { useEffect, useState } from "react";
import Popup from "./Popup";
import "../App.css";
import { TiDelete, TiTick, TiTickOutline } from "react-icons/ti";
import { MdDarkMode, MdModeEdit, MdOutlineDarkMode } from "react-icons/md";
import { BiLogIn } from "react-icons/bi";
import { useTheme } from "../hooks/useTheme";
const Home = () => {
  const { theme, setTheme } = useTheme();
  const [first, setfirst] = useState("");
  const [edit, setEditItem] = useState();
  const [item, setItem] = useState([]);
  const [filterItem, SetFilterItem] = useState([]);
  const [showpopup, setshowpopup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUserName] = useState("");
  const [editUsername, setEditUsername] = useState("");

  useEffect(() => {
    if (localStorage.getItem("name")) setUserName(localStorage.getItem("name"));
    fetch("https://6319cc698e51a64d2beca04f.mockapi.io/todos", {
      method: "get",
    })
      .then((res) => res.json())
      .then((data) => {
        
    SetFilterItem(data);
    setItem(data)});

  }, []);

  function changeItems(it) {
    console.log("GİRDİ", it);
    let newItems = item.map((itt) => {
      if (itt.id == it.id) return it;
      else return itt;
    });
    setItem(newItems);
    SetFilterItem(newItems)
    setshowpopup(false);
  }
  function handleSubmit(e) {
    if (first.length < 3) {
      return window.alert("Task should least 3 characters");
    }

    e.preventDefault();
    fetch("https://6319cc698e51a64d2beca04f.mockapi.io/todos", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: first,
      }),
    })
      .then((res) => res.json())
      .then((data) => setItem([...item, data]));
  }

  function handleLogin(e) {
    setUserName(editUsername);
    localStorage.setItem("name", username);
    setShowLogin(false);
  }

  function handleDelete(id) {
    fetch(`https://6319cc698e51a64d2beca04f.mockapi.io/todos/${id}`, {
      method: "delete",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setItem(item.filter((it) => it.id != data.id)));
  }
  function handleCompleted(it) {
    console.log("it", it);
    console.log("id", it.id);
    fetch(
      `https://6319cc698e51a64d2beca04f.mockapi.io/todos/${it.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isCompleted: !it.isCompleted,
        }), 
      }
    )
      .then((res) => res.json())
      .then((data) => {
        changeItems(data);
      });
  }

  function handleAllItem(e) {
    SetFilterItem(item);
  }
  function handleIsCompleted(e) {
    let newItem = item.filter((it) => it.isCompleted == true);
    SetFilterItem(newItem);
  }
  function handleIsNotCompleted(e) {
    let newItem = item.filter((it) => it.isCompleted == false);
    SetFilterItem(newItem);
  }
  return (
    <div className="min-h-screen bg-slate-300 dark:bg-slate-800">
      <div className="flex justify-between lg:pl-72 lg:pr-10 pl-6 pr-3 pt-10">
        <h1 className="text-3xl font-medium tracking-wide dark:text-white">
          Welcome {username}
        </h1>
        <div className="flex">
          <button>
            <BiLogIn
              size={30}
              className="cursor-pointer mr-4 dark:text-white"
              onClick={(e) => {
                setShowLogin(true);
              }}
            />
            {showLogin ? (
              <div className="fixed w-full h-full inset-0 m-auto bg-black bg-opacity-40 ">
                <div className="rounded-lg absolute top-32 left-5 right-5 bottom-[25rem] lg:right-[24rem] lg:left-[24rem] lg:bottom-[12rem] lg:inset-1/4 m-auto bg-white">
                  <div className="flex flex-col items-center mt-16">
                    <h1 className="text-xl lg:text-2xl">
                      Welcome Please Enter Your Name
                    </h1>
                    <input
                      placeholder="Enter Your Name"
                      className="focus:outline-none w-64 lg:w-80 py-2 px-3 mt-8 border-2"
                      value={editUsername}
                      onChange={(e) => setEditUsername(e.target.value)}
                    ></input>
                    <div className="justify-between">
                      <button
                        onClick={(e) => handleLogin(e)}
                        className="bg-red-800 hover:bg-red-700 rounded-sm w-24 lg:w-32 h-10 mr-16 mt-10 text-white"
                      >
                        Login
                      </button>
                      <button
                        onClick={() => setShowLogin(false)}
                        className=" bg-orange-700 hover:bg-orange-600 rounded-sm w-24 lg:w-32 h-10  text-white"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </button>
          {theme === "light" ? (
            <MdDarkMode
              size={30}
              className="cursor-pointer"
              onClick={() => setTheme("dark")}
            />
          ) : (
            <MdOutlineDarkMode
              size={30}
              className="cursor-pointer text-white"
              onClick={() => setTheme("light")}
            />
          )}
        </div>
      </div>
      <div className="pt-12 flex flex-col lg:place-items-center ">
        <div className="">
          <div className="mb-3 text-lg font-medium text-white dark:text-black">
            <button className="dark:bg-white bg-slate-700 ml-3 lg:ml-0 mr-1 lg:mr-5 rounded-sm py-2 px-5" onClick={(e) => handleAllItem(e)}>ALL</button>
            <button className="dark:bg-white bg-slate-700 mr-1 lg:mr-5 rounded-sm py-2 px-5" onClick={(e) => handleIsCompleted(e)}>Completed</button>
            <button className="dark:bg-white bg-slate-700 rounded-sm py-2 px-5" onClick={(e) => handleIsNotCompleted(e)}>
              Not Completed
            </button>
          </div>
          <div className="lg:flex lg:w-[52rem]">
            <input
              min={3}
              placeholder="Add a New Task"
              className="w-[18rem] lg:w-[52rem] h-10 mx-3 lg:mx-0 lg:mr-5 rounded-lg pl-5 focus:outline-none"
              value={first}
              onChange={(e) => setfirst(e.target.value)}
            />
            <button
              className="bg-white rounded-lg py-2 lg:py-1 px-3"
              onClick={(e) => handleSubmit(e)}
            >
              Submit
            </button>
          </div>
          <div className="mb-52 lg:mb-0">
            {filterItem.map((it) => (
              <div
                className="break-all	 rounded-lg dark:bg-white dark:hover:bg-white/80 bg-white/40 hover:bg-white/90 p-2 flex justify-between lg:w-[52rem] mb-10 mt-10 mx-3 lg:mx-0"
                key={it.id}
              >
                <div>
                  <p className="font-medium text-xl pl-3">{it.content}</p>
                </div>
                <div className="flex">
                  <button
                    className="mr-10"
                    onClick={(e) => handleDelete(it.id)}
                  >
                    <TiDelete className="text-red-800 w-8 h-8 hover:text-red-600" />
                  </button>
                  {it.isCompleted== true ? (
                    <button
                    className="mr-10"
                    onClick={(e) => handleCompleted(it)}
                  >
                    <TiTick  className="text-red-800 w-8 h-8 hover:text-red-600" />
                  </button>
                  ) : (
                    <button
                    className="mr-10"
                    onClick={(e) => handleCompleted(it)}
                  >
                    <TiTickOutline  className="text-red-800 w-8 h-8 hover:text-red-600" />
                  </button>
                  )}
                  
                  <button
                    onClick={(e) => {
                      setEditItem(it);
                      setshowpopup(true);
                    }}
                  >
                    <MdModeEdit className="text-orange-900 hover:text-orange-700 w-8 h-8" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          {showpopup ? (
            <Popup
              editItem={edit}
              changeItems={(it) => changeItems(it)}
              closePopup={() => setshowpopup(false)}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Home;
