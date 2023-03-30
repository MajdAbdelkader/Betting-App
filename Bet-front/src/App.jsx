import { useState } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import { getUserFromLocalStorage } from "./utils/jwtHelper";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const [LogOrRegister, setLogOrRegsiter] = useState(true);

  const user = getUserFromLocalStorage();
  return loggedIn ? (
    <Dashboard setLoggedIn={setLoggedIn} user={user} />
  ) : LogOrRegister ? (
    <Login setLoggedIn={setLoggedIn} setLogOrRegsiter={setLogOrRegsiter} />
  ) : (
    <Register setLogOrRegsiter={setLogOrRegsiter} setLoggedIn={setLoggedIn} />
  );
}

export default App;
