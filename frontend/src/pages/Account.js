import React from "react";
import SignIn from "../components/signIn";
import SignUp from "../components/signUp";
// Import your CSS file

export default function Account() {
  return (
    
    <div className="account-container">
      <h1>If you're a new user, please sign up first.</h1>
      <div className="form-container">
        <div className="sign-in-container">
          <h2>Sign In</h2>

          {<SignIn />}
        </div>
        <div className="sign-up-container">
          <h2>Sign Up</h2>
          <SignUp />
        </div>
      </div>
      <p className="test">For testing purposes, you can use "test@email.com" as the email and "1234" as the password.</p>
    </div>
    
  );
}
