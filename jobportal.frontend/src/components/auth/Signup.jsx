import React, { useState } from 'react';
import Navbar from './../Shared/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

function SignUp() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('student');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Loading state
  const [profilePic, setProfilePic] = useState(null); // State for profile picture
  const {user}=useSelector(store=>store.auth);
 
 useEffect(()=>
{
  if(user)navigate("/");

})
  const navigate=useNavigate();
  const handleSignUp =async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      setLoading(true); // Set loading to true when form is submitted
      
   try
   {
    const formData=new FormData();
    formData.append('fullname', fullName);
    formData.append('phoneNumber', phoneNumber);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('role', role);
    if (profilePic) {
      formData.append('file', profilePic);
    }

     const res=await axios.post(`${USER_API_END_POINT}/register`,
    formData,{
      headers:{
        'Content-Type': 'multipart/form-data',
        },
        withCredentials:true
        }
   );
   if(res.data.success)
    {navigate("/Login");
      toast.success(res.data.message);
   }
  else
  { toast.info(res.data.message);}
  }
   catch(error)
   {
    console.log(error);
   }
   finally
   {
    setLoading(false); // Set loading to true when form is submitted
   }
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };
const handleProfilePicChange = (e) => {
    setProfilePic(e.target.files[0]);
  };
  const validateForm = () => {
    const errors = {};
    if (!fullName) errors.fullName = 'Full Name is required';
    if (!email) errors.email = 'Email is required';
    if (!phoneNumber) errors.phoneNumber = 'Phone Number is required';
    if (!password) errors.password = 'Password is required';
    if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match';
    return errors;
  };

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 1:
        return 'bg-red-500';
      case 2:
        return 'bg-yellow-500';
      case 3:
        return 'bg-blue-500';
      case 4:
        return 'bg-green-500';
      default:
        return 'bg-gray-300';
    }
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 1:
        return 'Weak';
      case 2:
        return 'Fair';
      case 3:
        return 'Good';
      case 4:
        return 'Strong';
      default:
        return '';
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex justify-center items-center bg-gray-900">
          <div className="bg-white shadow-lg rounded-lg p-6 w-full" style={{ maxWidth: '500px' }}>
            <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
            <p className="text-gray-600 mb-4">Please fill in the details to create an account!</p>

            <form onSubmit={handleSignUp}>
              <div className="mb-3">
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: '' }));
                  }}
                  aria-label="Full Name"
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                  }}
                  aria-label="Email address"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div className="mb-3">
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    if (errors.phoneNumber) setErrors((prev) => ({ ...prev, phoneNumber: '' }));
                  }}
                  aria-label="Phone Number"
                  pattern="[0-9]*"
                />
                {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
              </div>

              <div className="mb-3">
                <label htmlFor="password" className=" text-sm font-medium text-gray-700 flex items-center">
                  Password
                  <span className={`ml-2 w-3 h-3 rounded-full ${getPasswordStrengthColor()}`}></span>
                  <span className="ml-2 text-sm">{getPasswordStrengthText()}</span>
                </label>
                <input
                  type="password"
                  id="password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    checkPasswordStrength(e.target.value);
                    if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
                  }}
                  aria-label="Password"
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              <div className="mb-3">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: '' }));
                  }}
                  aria-label="Confirm Password"
                />
                {password && confirmPassword && password !== confirmPassword &&
                  <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
                }
              </div>
              
              <div className="mb-3 grid grid-cols-2 gap-8 items-start">
  {/* Left Column (Role) */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Role
    </label>
    <div className="flex items-center">
      <label className="inline-flex items-center mr-6">
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
      <label className="inline-flex items-center">
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

  {/* Right Column (Profile Photo) */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Profile Photo
    </label>
    <div className="flex items-center">
      <input
        type="file"
        className="form-input"
        name="profilePic"
        onChange={handleProfilePicChange}
      />
    </div>
  </div>
</div>

               
                

              <button
  type="submit"
  className={`w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
  disabled={loading}
  aria-live="polite"
>
<div className="flex justify-center items-center">
    {loading ? <Loader2 /> : "Sign Up"}
  </div></button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-sm">Already have an account? <Link to="/login" className="text-indigo-600 hover:text-indigo-500 font-bold">Login</Link></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
