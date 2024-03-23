"use client"
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
} from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";

export default function Home() {
  const [users, setUsers] = useState();
  const [isLoading, setIsloading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  // Check if user is already logged in on component mount
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    setIsLogin(isLoggedIn === "true");
  }, []);

  useEffect(() => {
    const loader = async () => {
      const result = await axios.get(
        "https://boast-server.onrender.com/api/v1/waitlist"
      );
      setUsers(result?.data);
      setIsloading(false);
    };
    loader();
  }, []);

  const handleLogin = (email, pass) => {
    setIsLogin(true);
    // Save login status to localStorage
    localStorage.setItem("isLoggedIn", "true");
    // Optionally, save email and password
    localStorage.setItem("email", email);
    localStorage.setItem("password", pass);
  };

  const handleLogout = () => {
    setIsLogin(false);
    // Remove login status and any other stored credentials from localStorage
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const pass = e.target.password.value;
    if (email === "ridwan@contentguy.co" && pass === "Mydashboard12@") {
      handleLogin(email, pass);
    }
  };

  return (
    <div className="max-w-7xl mx-auto h-[100vh] mb-28">
      {!isLogin ? (
        <div className="max-w-2xl mx-auto border p-10 mt-20 rounded-lg shadow-xl">
          <h3 className="text-3xl font-bold my-5 text-center">Log In</h3>
          <div className="w-full h-[1px] bg-black my-5"></div>
          <form
            onSubmit={handleSubmit}
            className="p-10 rounded-lg shadow-lg"
          >
            <div className="flex flex-col gap-5 mb-5">
              <div>
                <h6>Email</h6>
                <Input
                  variant="underlined"
                  type="email"
                  name="email"
                  placeholder="Enter you email"
                />
              </div>
              <div>
                <h6>Password</h6>
                <Input
                  variant="underlined"
                  type="password"
                  name="password"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="w-full flex flex-col justify-center items-center mt-5">
              <button
                type="submit"
                className="bg-black hover:bg-[#DE3996] text-white px-6 py-2 rounded-full hover:text-black duration-300"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      ) : (
        <>
          {isLoading ? (
            <h3 className="text-center text-2xl font-bold mt-20">
              Loading...
            </h3>
          ) : (
            <>
              <h1 className="text-center text-5xl text-gray-700 my-5">
                Wait List
              </h1>
              <div className="my-5">
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Logout
                </button>
              </div>
              <Table isStriped aria-label="Example static collection table">
                <TableHeader>
                  <TableColumn>NAME</TableColumn>
                  <TableColumn>Email</TableColumn>
                  <TableColumn>Phone</TableColumn>
                  <TableColumn>Insta ID</TableColumn>
                  <TableColumn>Other Social</TableColumn>
                  <TableColumn>Followers</TableColumn>
                  <TableColumn>Brand</TableColumn>
                </TableHeader>
                <TableBody>
                  {users?.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>{user.name.toUpperCase()}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phoneNo}</TableCell>
                      <TableCell>{user.instagramId}</TableCell>
                      <TableCell>{user.otherSocialMediaId}</TableCell>
                      <TableCell>{user.followers}</TableCell>
                      <TableCell>{user.brand}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}
        </>
      )}
    </div>
  );
}
