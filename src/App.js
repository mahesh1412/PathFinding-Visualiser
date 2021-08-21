import React from "react";
import "./App.css";
import PathfindingVisualiser from "./components/PathfindingVisualiser";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
function App() {
  return (
    <>
      <ToastContainer />
      <PathfindingVisualiser />
    </>
  );
}

export default App;
