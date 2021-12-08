import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Navbar />} />
        <Route element={<br />} />
        <Route path="/" exact element={<ExercisesList />} />
        <Route path="/edit/:id" exact element={<EditExercise />} />
        <Route path="/create" exact element={<CreateExercise />} />
        <Route path="/user" exact element={<CreateUser />} />
      </Routes>
    </Router>
  );
}

export default App;
