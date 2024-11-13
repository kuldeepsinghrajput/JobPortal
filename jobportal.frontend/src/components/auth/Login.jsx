import React, { useEffect, useState } from "react";
import Navbar from "./../Shared/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {setUser} from "./../../redux/authSlice"
 
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false); // Loading state
     const {user}=useSelector(store=>store.auth);
       const navigate=useNavigate();

      useEffect(()=>
    {if(user)
      navigate("/");

    })
  const dispatch = useDispatch();


  const handleLogin = async (e) => {

    e.preventDefault();
    setLoading(true); // Set loading to true when form is submitted
      
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      formData.append('role', role);

      const res = await axios.post(
          `${USER_API_END_POINT}/login`,
          formData,
          {
              headers: {
                  "Content-Type": "multipart/form-data",
              },
              withCredentials: true,
          }
      );
      if (res.data.success) {
        
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
      else
      { toast.info(res.data.message);}
      
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false); // Set loading to false when request is complete
  }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex justify-center items-center bg-gray-900">
          <div
            className="bg-white shadow-lg rounded-lg p-8"
            style={{ maxWidth: "400px" }}
          >
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <p className="text-gray-600 mb-6">
              Please enter your login and password!
            </p>

            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Email address"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    aria-label="Password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                    onClick={() => setShowPassword(!showPassword)}
                  ></button>
                </div>
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <div className="mt-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      name="role"
                      value="student"
                      checked={role === 'student'}
                      onChange={(e) => setRole(e.target.value)}
                    />
                    <span className="ml-2">Student</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      type="radio"
                      className="form-radio"
                      name="role"
                      value="recruiter"
                      checked={role === 'recruiter'}
                      onChange={(e) => setRole(e.target.value)}
                    />
                    <span className="ml-2">Recruiter</span>
                  </label>
                </div>
              </div>


              <p className="text-sm mb-3">
                <a className="text-indigo-600 hover:text-indigo-500" href="#!">
                  Forgot password?
                </a>
              </p>
              <button
  type="submit"
  className={`w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
  disabled={loading}
  aria-live="polite"
>
<div className="flex justify-center items-center">
    {loading ? <Loader2 /> : "Login"}
  </div></button>
            </form>

            <div className="flex justify-center mt-4 space-x-3">
              <button className="text-gray-600 hover:text-gray-800">
                <i className="fab fa-facebook-f"></i>
              </button>
              <button className="text-gray-600 hover:text-gray-800">
                <i className="fab fa-twitter"></i>
              </button>
              <button className="text-gray-600 hover:text-gray-800">
                <i className="fab fa-google"></i>
              </button>
            </div>

            <div className="mt-6">
              <p className="text-sm">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-indigo-600 hover:text-indigo-500 font-bold"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
