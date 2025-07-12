import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Components/Homepage";
import Signuppage from "./Components/Signuppage";
import Loginpage from "./Components/Loginpage";
import Mainpage from "./Components/Mainpage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path="/mainpage" element={<Mainpage/>}/>
        <Route path="/signinpage" element={<Loginpage/>}/>
        <Route path="/signuppage" element={<Signuppage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
