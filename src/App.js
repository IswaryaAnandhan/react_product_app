
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./Product";
import Login from "./Login";
import Register from "./Register";
import Forgot from "./Forgot";
import Conform from "./Conform";


function App() {

  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Login/>}/>
    <Route path="/register" element={<Register />} />
    <Route path="/forgot" element={<Forgot />} />
    <Route path='/Reset-Password/:id/:token' element={<Conform/>}/>
    <Route path="/product" element={<Product/>}/>
    </Routes>
    </BrowserRouter>
   
  );
}

export default App;
