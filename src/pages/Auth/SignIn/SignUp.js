import "./SignUp.css";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signUpAction } from "../../../store/actions/authActions";

const Signup = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(signUpAction(email, password, username, navigate));
    navigate("/Login");
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSignup} className="signup-foam">
        <h2 className="signup-title">Sign Up</h2>
        <input
          className="signup-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="signup-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="signup-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="signup-button" type="submit">
          Sign Up
        </button>
        <p>
          Already have an account? <Link to="/Login">Log In</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
