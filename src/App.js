import React, { useState, useEffect } from "react";
import "./App.css";
// ICON REACT INSTAL DENGAN *npm i react-icons --save
import { AiOutlineDelete } from "react-icons/ai";
import { ImCheckmark } from "react-icons/im";
import { RiEditBoxFill } from "react-icons/ri";

function App() {
  // INISIALISASI FUNGSI
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodo, setTodo] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completeTodo, setCompleteTodo] = useState([]);

  // UNTUK MELAKUKAN UPSET DATA JIKA MENEKAN BUTTON TAMBAH
  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };
    let updateTodoArr = [...allTodo];
    updateTodoArr.push(newTodoItem);
    setTodo(updateTodoArr);
    //UNTUK MENGUBAH DATA MENJADI STRING AGARA DATA DAPAT DI PROSES KE LOCAL STORAGE
    localStorage.setItem("todolist", JSON.stringify(updateTodoArr));
  };

  // fungsi untuk button hapus
  const handleDelete = (index) => {
    let reducedTodo = [...allTodo];
    reducedTodo.splice(index);

    localStorage.setItem("todolist", JSON.stringify(reducedTodo));
    setTodo(reducedTodo);
  };

  const handleDeleteComplete = (index) => {
    let reducedTodo = [...completeTodo];
    reducedTodo.splice(index);

    localStorage.setItem("completeTodo", JSON.stringify(reducedTodo));
    setCompleteTodo(reducedTodo);
  };

  // FUNGSI DARI COMPLETE
  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDay();
    let mm = now.getMonth() + 1; // kenapa +1 karena hitunganya mulai dari 0
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completeOn =
      dd + "-" + mm + "-" + yyyy + " at " + h + ":" + m + ":" + s;

    let filteredItem = { ...allTodo[index], completeOn: completeOn };

    let updateCompleteArr = [...completeTodo];
    updateCompleteArr.push(filteredItem);
    setCompleteTodo(updateCompleteArr);
    handleDelete(index);
    localStorage.setItem("complete", JSON.stringify(updateCompleteArr));
  };

  // UNTUK MENGUBAG DARI STRING MENJADI ARRAY
  // useEffect di sini saya gunakan untuk fungsi pengguna atau user
  useEffect(() => {
    let saveTodo = JSON.parse(localStorage.getItem("todolist"));
    let savecompleteTodo = JSON.parse(localStorage.getItem("complete"));
    // fungsi if ini untuk memanipulasi ketika keadaan data kosong tidak akan menjalankan fungsi penarikan data\
    // karena jika tidak ada data pada local storage fungsi map pada line 98,20 tidak dapat berfungsi
    if (saveTodo) {
      setTodo(saveTodo);
    }

    if (savecompleteTodo) {
      setCompleteTodo(savecompleteTodo);
    }
  }, []);

  return (
    <div className="App">
      <h1>DAFTAR TUGAS</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Judul</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Apa Judul Tugas Ini?"
            ></input>
          </div>

          <div className="todo-input-item">
            <label>Deskripsi</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Apa Deskripsi Untuk Tugas Ini?"
            ></input>
          </div>

          <div className="todo-input-item">
            <button
              type="button"
              onClick={handleAddTodo}
              className="primaryBtn"
            >
              Tambah
            </button>
          </div>
        </div>

        <div className="btn-area">
          <button
            className={`tbl2 ${isCompleteScreen === false && "active"}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Tugas
          </button>

          {/* <button
            className={`tbl2 ${isCompleteScreen === true && "active"}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Berlangsung
          </button> */}

          <button
            className={`tbl2 ${isCompleteScreen === true && "active"}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Selesai
          </button>
        </div>

        <div className="todo-list">
          {isCompleteScreen === false &&
            allTodo.map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3> {item.title} </h3>
                    <p> {item.description} </p>
                  </div>

                  <div>
                    <AiOutlineDelete
                      className="icon-delete"
                      onClick={() => handleDelete(index)}
                      title="Delete X"
                    />
                    <RiEditBoxFill className="icon-edit" title="Edit" />
                    <ImCheckmark
                      className="icon-check"
                      onClick={() => handleComplete(index)}
                      title="Complete"
                    />
                  </div>
                </div>
              );
            })}

          {isCompleteScreen === true &&
            completeTodo.map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3> {item.title} </h3>
                    <p> {item.description} </p>
                    <p>
                      <small>Complete on : {item.completeOn} </small>
                    </p>
                  </div>

                  <div>
                    <AiOutlineDelete
                      className="icon-delete"
                      onClick={() => handleDeleteComplete(index)}
                      title="Delete X"
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
