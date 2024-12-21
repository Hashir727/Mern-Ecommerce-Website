import React, { useState } from "react";
import axios from "axios";
import backendUrl from "../App";
import { toast } from "react-toastify";

function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      // http://localhost:4000
      // const response = await axios.post(backendUrl + "/api/user/admin", {

      const response = await axios.post(
        "http://localhost:4000/api/user/admin",
        {
          email,
          password,
        }
      );

      if (response.data.success) {
        setToken(response.data.token);
        toast.success("Logged in successfully!");
      } else {
        toast.error(response.data.message);
      }
      console.log(response);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Email Address
            </p>
            <input
              onChange={(e) => setEmail(e.target.value)} // Correct handler
              value={email}
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              type="email"
              placeholder="your@email.com"
            />
          </div>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)} // Correct handler
              value={password}
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              type="password" // Corrected input type
              placeholder="Enter your password"
            />
          </div>
          <button
            className="mt-2 w-full py-2 px-4 rounded-md text-white bg-black hover:bg-gray-900"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
