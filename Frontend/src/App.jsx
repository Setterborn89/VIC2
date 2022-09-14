import { useState } from "react";
import "./App.css";
import MyRouter from "./components/MyRouter";
import {GlobalContextProvider} from "./contexts/UserContext"


function App() {
  return (
    <GlobalContextProvider>
      <MyRouter />
    </GlobalContextProvider>
  );
}

export default App;

// import { useState, createContext, useContext } from "react";
// import "./App.css";
// import MyRouter from "./components/MyRouter";

// export const UserContext = createContext();

// function App() {
//   const [user, setUser] = useState = ("Mysan");

//   return (
//     <UserContext.Provider value={user}>
//       <MyRouter />
//     </UserContext.Provider>
//   );
// }

// export default App;
