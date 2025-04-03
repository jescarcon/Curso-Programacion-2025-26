import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Note from "./components/note/note";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Note/>} />
      </Routes>
    </Router>
  );
}

export default App;