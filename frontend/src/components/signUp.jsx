import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../constants";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  // console.log(email,password)

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/users/register`, {
        name,
        email,
        password,
      });
      console.log(res);
      const data = await res.data;
      console.log(data);
      dispatch(setCredentials(data));
      toast.success("Registration successful!");
      console.log("Cookies:", document.cookie);
    } catch (err) {
      const response = err.response;
      toast.error(response ? response.data.message : err.message);
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <br></br>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="signIn" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;


