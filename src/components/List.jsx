import { useEffect, useState } from "react"


function List(props) {


    const dataList = props.data;



    const [base, setBase] = useState([])



    function updateData(status) {

        if (status == "false") {

            const result = fetch(`http://localhost:3000/todo/${dataList.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ "completed": "true" })
            })

        


        } else {
            const result = fetch(`http://localhost:3000/todo/${dataList.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ "completed": "false" })
            })

          


        }




    }

    // function removeData() {
    //     const result = fetch(`http://localhost:3000/todo/${dataList.id}`, {
    //         method: "DELETE",
    //         headers: {
    //             "Content-Type": "application/json"
    //         }
    //     })

    // }

    useEffect(() => {

    }, [])



    return (
        <>
            {<li>
                {dataList.completed == "true"? <input type="checkbox" checked onChange={()=> props.updateTodo(dataList.id,dataList.completed)} /> : <input type="checkbox" onChange={()=> props.updateTodo(dataList.id,dataList.completed)} />}
                <p>{dataList.task}</p>
                <button onClick={() => props.deleteTodo(dataList.id, dataList.completed)}>Remove</button>
            </li>}
            {/* {datasList.map((element, index) => {
                return (<li key={index}>
                    <input type="checkbox" onChange={() => updateData(element.id)} />
                    <p>{element.task}</p>
                    <button onClick={() => removeData(element.id)}>Remove</button>
                </li>
                )
            })} */}

        </>
    )
}

export default List