import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { UserData } from "../context/User";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loginUser, btnLoading } = UserData();

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    loginUser(email, password, navigate);
  };

  return (
    <div className="flex items-center justify-center h-screen max-h-screen">
      <div className="bg-black text-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-4xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 animate-fadeIn flex justify-center items-center">
          Login to CastCloud
          <img
            src="/podcast.png"
            alt="CastCloud logo"
            className="ml-0.5 w-8 h-8"
          />
        </h2>

        <form className="mt-8" onSubmit={submitHandler}>
          <div className="mb-4">
            <label htmlFor="email" className="sr-only">
              Email or Name
            </label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="email"
                type="email"
                placeholder="Email or Name"
                className="auth-input pl-10"
                required
                aria-label="Email or Name"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="password"
                type="password"
                placeholder="Password"
                className="auth-input pl-10"
                required
                aria-label="Password"
                value={password}
                onChange={e  => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-6">
            <button disabled={btnLoading} type="submit" className="auth-btn">
              {btnLoading ? "Loading..." : "Login"}
            </button>
          </div>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm inline text-neutral-400">
            Don't have an account?{" "}
          </p>
          <Link to="/register" className="text-sm hover:text-indigo-400 ml-1">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
