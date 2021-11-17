import '../styles/Todo.css'

function Todo(params){

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