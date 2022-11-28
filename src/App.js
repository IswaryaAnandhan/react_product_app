
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./Components/Product";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Forgot from "./Components/Forgot";
import Confirm from "./Components/Confirm";


function App() {

  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Login/>}/>
    <Route path="/register" element={<Register />} />
    <Route path="/forgot" element={<Forgot />} />
    <Route path='/Reset/:id/:token' element={<Confirm/>}/>
    <Route path="/product" element={<Product/>}/>
  
    </Routes>
    </BrowserRouter>
   
  );
}

export default App;
