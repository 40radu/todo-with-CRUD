
export function post (newTask) {
    
    const fetchPost = fetch ("http://localhost:3000/todo/", {
        method :"POST",
        headers : {
            "Content-Type":"application/json"
        },
        body : JSON.stringify ({"task": `${newTask}`, "completed": "false" })
    })
}