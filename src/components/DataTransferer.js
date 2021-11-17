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

  return (
    <div className="exportDataDiv">
      <button className="exportDataBtn" onClick={exportData}>
        Daten exportieren
      </button>
    </div>
  );
}

export default DataTransferer;
