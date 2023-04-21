import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import "../App.css";
import Login from "../pages/login";
import Home from "../pages/home";
import Register from "../pages/register";

export default function Main() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        {/* <Route path="/logout" element={<Logout/>}></Route> */}
        <Route path="*" element={<h1><div style={{fontSize: "100px"}}>404</div> Not Found</h1>}></Route>


        {/* <Route
          path="teams/:team_id/create_project"
          element={<CreateProject />}
        ></Route>
        <Route
          path="teams/:team_id/add_student"
          element={<AddStudent />}
        ></Route>
        <Route path="teams/:team_id/:project_id" element={<Project />}></Route> */}
      </Routes>
    </div>
  );
}
