import "../styles/Home.css";

function Home() {
  let updateName = () => {
    let textfield = document.querySelector("#nameTextField");
    let name = textfield.value;
    localStorage.setItem("disembleergon-todo-app-name", name);
    window.open("/", "_self");
  };

  let redirectTodos = () => {
    window.open("/", "_self");
  };

  return (
    <div>
      <nav>
        <button id="backHomeBtn" onClick={redirectTodos}>
          zurück
        </button>
      </nav>

      <div className="homeHeaderDiv">
        <h1 id="homeText">Home</h1>
      </div>

      <div className="homeFormDiv">
        <input type="text" id="nameTextField" placeholder="Dein Name"></input>
        <button id="nameSubmitBtn" onClick={updateName}>
          bestätigen
        </button>
      </div>

    </div>
  );
}

export default Home;
