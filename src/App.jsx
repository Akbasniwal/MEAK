import React, { useContext } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
} from "react-router-dom";

import { AuthState } from "./Context/AuthContext";
import Main from "./pages/main";

function App() {
  axios.defaults.baseURL = "http://localhost:4500";
  axios.defaults.withCredentials = true;

  return (
    <Router>
      <AuthState>
        <Main/>
      </AuthState>
    </Router>
  );
}

export default App;
