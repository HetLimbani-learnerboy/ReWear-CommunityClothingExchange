import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Homepage=()=>{
    const navigate=useNavigate();
    return(
        <div className="Homepage-design">
            <h1>Hello</h1>
            <button onClick={()=>navigate('/signuppage')} >Signuppage</button>
            <button onClick={()=>navigate('/signinpage')} >Signin pagde</button>
            <button onClick={()=>navigate('/mainpage')} >Get Started</button>
        </div>
    )

}
export default Homepage;