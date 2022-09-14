import { useState } from "react";
import "./App.css";
import MyRouter from "./components/MyRouter";
import { GlobalContextProvider } from "./contexts/UserContext";

function App() {
  return (
    <GlobalContextProvider>
      <MyRouter />
    </GlobalContextProvider>
  );
}

export default App;
