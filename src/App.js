import logo from './logo.svg';
import './App.css';
import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';
import {  Routes, Route } from "react-router-dom";
import EditStudent from "./components/EditStudent";

function App() {
  return (
    <>
    <Routes>

      <Route path="/" element={<StudentList/>}/>
      <Route path="/add" element={<AddStudent/>}/>
      <Route path="/edit/:id" element={<EditStudent/>}/>
    </Routes>
   

    
    
    </>
    
  );
}

export default App;
