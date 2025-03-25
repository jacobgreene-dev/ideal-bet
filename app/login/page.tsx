"use client";

import React, { useState, ChangeEvent } from "react";
import Header from "../components/_Header";
import Footer from "../components/_Footer";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");

  const inputStyle =
    "border-[2px] text-black border-silver rounded-lg outline-[#000000] p-2 focus:border-[#000000] ease-linear duration-200 ";

  const handleChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = evt.target;
    if (name === "email") setEmail(value);
    if (name === "pass") setPass(value);
  };

  return (
    <div>
      <Header />
      <div className="flex justify-center w-full h-screen">
        <div className="flex flex-col absolute top-[30%] bg-white shadow-lg border-silver border-[2px] rounded-lg p-5 w-[40%] mobile:w-[90%]">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Log in</h1>


          {/* Email */}
          <div className="flex mt-4">
            <input
              className={`${inputStyle} mt-2 w-full`}
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              value={email}
              required
            />
          </div>

          {/* Password */}
          <div className="flex mt-4">
            <input
              className={`${inputStyle} w-full`}
              name="pass"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              value={pass}
              required
            />
          </div>

          {/* Submit button */}
          <input
            type="button"
            className="mt-5 flex justify-center bg-sky-500 text-white font-medium rounded-md p-2 border-[2px] border-transparent hover:bg-white hover:text-sky-500 hover:border-sky-500 hover:shadow-md ease-linear duration-200"
            value="Log in"
            disabled
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
