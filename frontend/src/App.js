import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./Components/Homepage";
import Signuppage from "./Components/Signuppage";
import Loginpage from "./Components/Loginpage";
import Mainpage from "./Components/Mainpage";
import Userdash from "./Components/Userdashbord";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path="/mainpage" element={<Mainpage/>}/>
        <Route path="/signinpage" element={<Loginpage/>}/>
        <Route path="/signuppage" element={<Signuppage/>}/>
        <Route path="/userdash" element={<Userdash/>}/>
        <Route path="/newproduct" element={<ProductListing/>}/>
        <Route path="/newproduct" element={<ProductListing/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
