import "../styles/Home.css";
import DataTransferer from "./DataTransferer";

function Home() {
  const updateName = () => {
    let textfield = document.querySelector("#nameTextField");
    let name = textfield.value;
    localStorage.setItem("disembleergon-todo-app-name", name);
    window.open("/", "_self");
  };

  const redirectTodos = () => {
    window.open("/", "_self");
  };

  const resetValues = () => {
    // confirm
    if (!window.confirm("Möchtest du wirklich deine Daten löschen?")) return;

    try {
      localStorage.removeItem("disembleergon-todo-app-todos");
      localStorage.removeItem("disembleergon-todo-app-name");
      window.alert("Löschen der Daten war erfolgreich!");
    } catch (e) {
      window.alert("Löschen der Daten fehlgeschlagen.");
    }
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

      {/* contains buttons and functionality to export/import todos */}
      <DataTransferer />

      <div className="resetValuesDiv">
        <button id="resetValuesBtn" onClick={resetValues}>
          Daten löschen
        </button>
      </div>
    </div>
  );
}

export default Home;
