import React, { useState } from "react";
import "./signup.css";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState("password");
  const navigate = useNavigate();

  const signup = async () => {
    try {
      const postmessage = await axios.post(
        "http://localhost:3500/api/reguser",
        { username: username, password: password }
      );
      const alertmessage = await postmessage.data;
      alert(alertmessage);
      navigate("/login");
      setuserName("");
      setPassword("");
    } catch (error) {
      if (error.response) {
        console.log(error.response.status); // 401
        alert(error.response.data); // User already exists
      } else {
        console.log("An unexpected error occurred:", error);
      }
    }
  };

  return (
    <div>
      <p
        className="fs-1 fw-medium text-center mt-2 mb-1"
        style={{ color: "#6084af" }}
      >
        Gemini AI
      </p>
      <section className="d-flex justify-content-center align-items-center  w-100 h-100">
        <form className="border rounded mt-3 cus-form p-2 mb-3">
          <h2 className="text-center p-2">
            <span>Sign Up</span>
          </h2>
          <div className="d-flex flex-column mt-3 justify-content-center">
            <label className="">Username</label>
            <input
              placeholder="Enter your name"
              className="cus-input-signup mt-2"
              value={username}
              onChange={(e) => setuserName(e.target.value)}
            ></input>
          </div>
          <div className="d-flex flex-column mt-3">
            <label>password</label>
            <input
              placeholder="password"
              type={visible}
              className="cus-input-signup mt-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div className="text-center">
            <button
              type="button"
              className="btn btn-primary fw-medium mt-4 "
              onClick={() => signup()}
            >
              Sign Up
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Signup;
