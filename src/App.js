import React from "react";
import "./App.css";
import Addproduct from "./components/Addproduct";
import Showproduct from "./components/Showproduct";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Editproduct from "./components/Editproduct";
function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Showproduct />} />
          <Route path="/add" element={<Addproduct />} />
          <Route path="/edit/:id" element={<Editproduct />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
