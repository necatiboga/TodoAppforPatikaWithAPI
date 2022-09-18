import React from "react";

const Popup = (props) => {
  const [editNew, setEditNew] = React.useState("");

  function editItemm() {
    fetch(
      `https://6319cc698e51a64d2beca04f.mockapi.io/todos/${props.editItem.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: editNew,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        props.changeItems(data);
      });
  }

  return (
    <div className="popup">
      <div className="rounded-lg absolute top-32 right-[2rem] left-[3rem] bottom-[25rem] lg:inset-1/4 m-auto bg-white">
        <div className="flex flex-col justify-center items-center mt-20">
          <h1 className="font-medium text-xl" >{props.editItem.content}</h1>
          <input
            placeholder="Edit This Task"
            className="border-2 rounded-mb mt-10 p-2  focus:outline-none"
            value={editNew}
            onChange={(e) => setEditNew(e.target.value)}
          ></input>
          <div className="flex-row mt-10">
          <button className="bg-orange-700 hover:bg-orange-600 rounded-sm py-2 px-6 mr-12 text-white" onClick={() => editItemm()}>Edit</button>

          <button className="bg-red-800 hover:bg-red-700 rounded-sm py-2 px-4 text-white" onClick={props.closePopup}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
