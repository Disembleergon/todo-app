import '../styles/Todo.css'

function Todo(params){

    console.log(params.id + " => " + params.task);

    return(
        <div className="todoDiv">
            <p>{params.task}</p>
            <div className="rmButtonDiv">
                <button id="rmButton" onClick={() => params.rmTodos(params.id)}>X</button>
            </div>
        </div>
    )

}

export default Todo;