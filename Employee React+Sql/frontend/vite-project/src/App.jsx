import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeList from './Components/EmployeeList';
import AddEmployee from './Components/AddEmployee';
import EditEmployee from './Components/EditEmployee';
// index.js or App.js
import 'bootstrap/dist/css/bootstrap.min.css';
// Inside server.js or app.js




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmployeeList />} />
        <Route path="/add" element={<AddEmployee />} />
        <Route path="/edit/:id" element={<EditEmployee />} />
      </Routes>
    </Router>
  );
}

export default App;
