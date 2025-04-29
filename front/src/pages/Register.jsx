import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (
      !formData.username ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.email
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          email: formData.email,
        }),
      });

      if (response.ok) {
        alert("Register Success!");
        navigate("/login");
      } else {
        const errorData = await response.json();
        alert(`Register failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className=" w-[350px] h-[505px] px-4 bg-white flex flex-col rounded-2xl overflow-hidden items-center">
        <img src="/logo2.png" alt="" className=" w-[320px] mt-4" />
        <h1 className=" my-4 text-black font-bold text-xl">Register</h1>
        <div className=" w-full h-[170px] flex flex-col justify-around">
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
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className=" text-black text-sm font-bold border-2 border-[#B2B1B9] rounded-lg w-full h-[32px] px-1.5"
          />
          <input
            type="text"
            placeholder="Gmail"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className=" text-black text-sm font-bold border-2 border-[#B2B1B9] rounded-lg w-full h-[32px] px-1.5"
          />
        </div>
        <button
          onClick={handleSubmit}
          className=" my-4 bg-[#102E50] w-full h-[30px] rounded-md text-white"
        >
          Register
        </button>

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

export default Register;
