import React, { useEffect, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate()
  const [rerender, setRerender] = useState(0)

  const saveCred = (data) => {
    console.log(data)
    sessionStorage.setItem("token", data.token)
    sessionStorage.setItem("username", data.firstName)
    setRerender(Math.random())
  }

  const handleLogin = (e) => {
    e.preventDefault();
    fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: credentials.username,
        password: credentials.password,
        // expiresInMins: 60, // optional
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        !data.message ? saveCred(data) : toast("check credentials again")
      });
  };
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      navigate("/home")
      console.log("navigated")
    }
    console.log("not navigate")
  })
  return (
    <div className="parent">
      <div></div>
      <div className="leftblock">
        <span><h1>Sign In</h1></span>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            className="inputentity"
          /><br/>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            className="inputentity"
          /><br/>
          <button className="loginbtn">login</button>
        </form>
      </div>
      <div className="rightblock">

      </div>
    </div>
  );
};

export default Login;
