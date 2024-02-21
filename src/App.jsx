import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import { post } from './service/Post'
import List from './components/List'

function App() {

  const [task, setTask] = useState("");
  const [listTask, setListTask] = useState([]);
  const [manageListTask, setManageListTask] = useState([]);

  function inputHandleChange(event) {
    setTask(event.target.value)
  }

  function postData() {
    post(task);
    setTask("");
    const inputt = document.querySelector("input")
    inputt.value = "";

    manageGetData();
  }
  //Delete test 
  function deleteData(id, completed) {

    if (completed == "true") {
      const confirmationDelete = prompt ("Voulez vous vraiment supprimer ? Si oui, veuillez ecrire oui, si non, veuillez cliquer sur le bouton Cancel")

      if( confirmationDelete === "oui") {
        const deleteFetch = fetch(`http://localhost:3000/todo/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        })
  
        setListTask(listTask.filter(todo => todo.id !== id))
      }

      
    } else {
        alert ("Unfinished task")
    }

  }


  function update(id, status) {

    if (status === "false") {
      const result = fetch(`http://localhost:3000/todo/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ "completed": "true" })


      })

      manageGetData()
    } else {
      const result = fetch(`http://localhost:3000/todo/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ "completed": "false" })
      })

      manageGetData()

    }



  }



  function getData() {
    const fetchGet = fetch("http://localhost:3000/todo/").then(async (data) => {
      setListTask(await data.json())
    })

  }

  function manageGetData() {
    const fetchGetManag = fetch("http://localhost:3000/todo/").then(async (data) => {
      setManageListTask(await data.json())
    })

  }

  useEffect(() => {
    getData();

  }, [manageListTask])

  return (
    <>
      <h1>List tasks</h1>
      <input type="text" placeholder='Enter your task ...' onChange={inputHandleChange} />
      <button onClick={postData}>Add</button>
      <ul>
        {
          listTask.map((element, index) => {
            return <List data={element} key={index} deleteTodo={deleteData} updateTodo={update} />
          })
        }
        {/* <List data = {listTask}/> */}

      </ul>
    </>
  )
}

export default App
