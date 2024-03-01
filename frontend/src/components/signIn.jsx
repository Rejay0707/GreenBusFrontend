import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import { BASE_URL } from "../constants";
import axios from "axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/users/login`, { email, password });
      console.log(res);
      const data = await res.data;
      console.log(data);
      dispatch(setCredentials(data));
      toast.success("Login successful!");
      console.log("Cookies:", document.cookie);
    } catch (err) {
      toast.warn("Invalid email or password");
      const response = err.response;
      if (response && response.status === 404) {
        toast.warn("User not registered. Please register first.");
      } else {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <br></br>
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
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
