import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const savedUsername = localStorage.getItem("rememberUsername");
    const savedPassword = localStorage.getItem("rememberPassword");
    if (savedUsername && savedPassword) {
      setFormData({ username: savedUsername, password: savedPassword });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlelogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
        credentials: "include",
      });

      if (response.ok) {
        alert("Login success!");
      } else {
        const errorData = await response.json();
        alert(`Login failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  const handleRememberMe = (checked) => {
    setRememberMe(checked);
    if (checked) {
      localStorage.setItem("rememberUsername", formData.username || "");
      localStorage.setItem("rememberPassword", formData.password || "");
    } else {
      localStorage.removeItem("rememberUsername");
      localStorage.removeItem("rememberPassword");
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className=" w-[350px] h-[505px] px-4 bg-white flex flex-col rounded-2xl overflow-hidden items-center">
        <img src="/logo2.png" alt="" className=" w-[320px] mt-4" />
        <h1 className=" my-4 text-black font-bold text-xl">Login</h1>
        <div className=" w-full h-[90px]  flex flex-col justify-around ">
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className=" text-black text-sm font-bold border-2 border-[#B2B1B9] rounded-lg w-full h-[32px] px-1.5 focus:border-black "
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className=" text-black text-sm font-bold border-2 border-[#B2B1B9] rounded-lg w-ful h-[32px] px-1.5"
          />
        </div>

        <div className="flex items-start mt-4 my-4">
          <div className="flex items-center h-5">
            <input
              id="remember"
              aria-describedby="remember"
              type="checkbox"
              className="w-4 h-4 border accent-blue-500 shadow-[2px_2px_2px_rgba(0,0,0,1)]"
              checked={rememberMe}
              onChange={(e) => handleRememberMe(e.target.checked)}
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="remember" className="text-black font-medium">
              Remember me
            </label>
          </div>
        </div>
        <button
          onClick={handlelogin}
          className=" my-2 bg-[#102E50] w-full h-[30px] rounded-md text-white"
        >
          Login
        </button>
        <Link to={"/reset-password"} className=" my-3 text-sm underline">
          Forgotten password?
        </Link>

        <div className=" w-full h-[70px] mt-2 border-gray-400 border-t-2 flex flex-col items-center">
          <h2 className=" text-black text-[10px] mt-1.5 font-medium">
            Contract Us
          </h2>

          <div className=" w-full flex justify-between px-4 mt-2  ">
            <a
              href="https://www.facebook.com/Bluestone.co.th/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/icons-facebook.png" alt="Icon" className="w-11 h-11" />
            </a>

            <a
              href="https://www.instagram.com/bluestonethailand/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/icons-ig.png" alt="Icon" className="w-11 h-11" />
            </a>

            <a
              href="https://line.me/ti/p/~@bluestonethailand"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/icons-line.png" alt="Icon" className="w-11 h-11" />
            </a>

            <a
              href="https://www.youtube.com/channel/UCQ3mRpetmm5Ek-LLdTjwaNQ"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/icons-youtube.png" alt="Icon" className="w-11 h-11" />
            </a>
          </div>
          <a
            href="https://www.bluestone.co.th/"
            target="_blank"
            rel="noopener noreferrer"
            className=" text-sm mt-1 underline"
          >
            www.bluestone.co.th
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
