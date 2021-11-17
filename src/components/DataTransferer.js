import React from "react";
import "../styles/DataTransferer.css";

function DataTransferer() {
  const exportData = async () => {
    // fetch todos from local storage
    let todos = localStorage.getItem("disembleergon-todo-app-todos");
    if (!todos) {
      window.alert("You haven't logged in yet.");
      return;
    }

    // create an "a" element for download + create blob from todos
    const a = document.createElement("a");
    a.download = "exported_todos.json";
    a.href = URL.createObjectURL(new Blob([todos]), {
      type: "application/json",
    });

    // thirty seconds after clicking, delete url of blob
    a.addEventListener("click", (e) => {
      setTimeout(() => {
        URL.revokeObjectURL(a.href);
      }, 30);
    });

    a.click();
  };

  const importData = async () => {
    // get files and cancel when the array is empty
    const files = document.getElementById("importDataBtn").files;
    if (files.length === 0) return;

    // get first file
    const file = files[0];

    // read file
    let reader = new FileReader();
    reader.addEventListener("load", async (e) => {
      const fileContent = e.target.result;

      // try parsing the file, just to see if it is json content
      try {
        JSON.parse(fileContent);
      } catch (e) {
        window.alert("Failed to parse imported data.");
      }

      // update todos from imported files
      localStorage.setItem("disembleergon-todo-app-todos", fileContent);
    });
    reader.readAsText(file);
  };

  return (
    <div>
      <div className="DataDiv" id="exportDataDiv">
        <button className="DataBtn" onClick={exportData}>
          Daten exportieren
        </button>
      </div>
      <div className="DataDiv" id="importDataDiv">
        <label htmlFor="importDataBtn" className="DataBtn">
          <input
            className="DataBtn"
            id="importDataBtn"
            onClick={importData}
            type="file"
            onChange={importData}
          ></input>
          Daten importieren
        </label>
      </div>
    </div>
  );
}

export default DataTransferer;
