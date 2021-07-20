import { useState } from 'react';
import '../styles/TodoForm.css'
import Todo from './Todo'

function TodoPage(){

    // let user enter name
    if(localStorage.getItem("disembleergon-todo-app-name") == null)
        window.open("/home", "_self");
    
    var username = localStorage.getItem("disembleergon-todo-app-name");

    const redirectHome = () => {window.open("/home", "_self")};

    // ------ todo-mechanics ------

    const [todos, setTodos] = useState([]);

    const addTodo = () => {

        let textField = document.querySelector("#todoInputField");
        let todoContent = textField.value;

        // check if input text is not empty
        if(todoContent.match(/\s*/) && !todoContent.match(/\S+/))
            return;

        setTodos([{id: Date.now(), task: todoContent}, ...todos]);

        // reset textField
        textField.value = "";
    }

    const rmTodo = (id) => {
        setTodos(todos.filter(todo => 
            todo.id !== id
        ))
    }

    return(
        <div className="todoPage">
            <nav>
                <button id="backHomeBtn" onClick={redirectHome}>Home</button>
            </nav>

            <div className="headerDiv">
                <h1>{username}'s</h1>
                <h1>Todo-Liste</h1>
            </div>

            <div className="todoFormDiv">
                <input type="text" id="todoInputField"></input>
                <button id="todoSubmitButton" onClick={addTodo}><div><p>✚</p></div></button>
            </div>

            <div className="todoListDiv">
                {todos.map(todo => (
                    <Todo key={todo.id} id={todo.id} task={todo.task} rmTodos={rmTodo}/>
                ))}
            </div>
        </div>
    )
}

export default TodoPage;