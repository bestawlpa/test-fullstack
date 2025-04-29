import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Reset = () => {
  const [verifyOpen, setVerifyOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    verifyCode: "",
    newPassword: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSendToken = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:3000/api/send-verify-code",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
          }),
        }
      );

      if (response.ok) {
        setVerifyOpen(true);
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      alert("Something went wrong. Please try again later.");
    }
  };

  const handleResetPassword = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/reset-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          verifyCode: formData.verifyCode,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword,
        }),
      });

      if (response.ok) {
        alert("Password has changed");
        navigate("/login");
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className=" w-[350px] min-h-[380px] px-4 bg-white flex flex-col rounded-2xl overflow-hidden items-center">
        <img src="/logo2.png" alt="" className=" w-[320px] mt-4" />
        <h1 className=" my-4 text-black font-bold text-xl">Forgot Password</h1>
        <div className=" w-full h-[50px]  flex flex-col justify-around ">
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className=" text-black text-sm font-bold border-2 border-[#B2B1B9] rounded-lg w-full h-[32px] px-1.5 focus:border-black "
          />
        </div>
        <button
          onClick={handleSendToken}
          className=" my-4 bg-[#102E50] w-full h-[30px] rounded-md text-white"
        >
          Send Reset Token
        </button>

        {verifyOpen && (
          <div className="w-full flex flex-col gap-2 mt-2">
            <input
              type="text"
              placeholder="Verify Code"
              name="verifyCode"
              value={formData.verifyCode}
              onChange={handleChange}
              className="text-black text-sm font-bold border-2 border-[#B2B1B9] rounded-lg w-full h-[32px] px-2"
            />
            <input
              type="password"
              placeholder="New Password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="text-black text-sm font-bold border-2 border-[#B2B1B9] rounded-lg w-full h-[32px] px-2"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="text-black text-sm font-bold border-2 border-[#B2B1B9] rounded-lg w-full h-[32px] px-2"
            />
            <button
              onClick={handleResetPassword}
              className="bg-[#102E50] mb-6 w-full h-[30px] rounded-md text-white mt-2"
            >
              Reset Password
            </button>
          </div>
        )}

        <div className=" w-full h-[105px] mt-2 border-gray-400 border-t-2 flex flex-col items-center">
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

export default Reset;
