import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogOverlay,
} from "@radix-ui/react-dialog";
import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import axios from "axios";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const [input, setInput] = useState({
    fullname: user?.fullname,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.profile?.bio,
    skills:user?.profile?.skills?.join(' ') || '',
    file: user?.profile?.resume,
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50" />
      <DialogContent className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
          <DialogTitle className="text-2xl font-semibold mb-6">
            Update Profile
          </DialogTitle>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="fullname" className="text-right">
                  Name
                </label>
                <input
                  type="text"
                  value={input.fullname}
                  id="fullname"
                  name="fullname"
                  className="col-span-3 border border-gray-300 bg-gray-100 shadow-md rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={changeEventHandler}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="email" className="text-right">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={input.email}
                  name="email"
                  className="col-span-3 border border-gray-300 bg-gray-100 shadow-md rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={changeEventHandler}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="phoneNumber" className="text-right">
                  Number
                </label>
                <input
                  id="phoneNumber"
                  type="number"
                  value={input.phoneNumber}
                  name="phoneNumber"
                  className="col-span-3 border border-gray-300 bg-gray-100 shadow-md rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={changeEventHandler}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="bio" className="text-right">
                  Bio
                </label>
                <input
                  id="bio"
                  type="text"
                  name="bio"
                  value={input.bio}
                  className="col-span-3 border border-gray-300 bg-gray-100 shadow-md rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={changeEventHandler}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="skills" className="text-right">
                  Skills
                </label>
                <input
                  id="skills"
                  type="text"
                  name="skills"
                  value={input.skills}
                  className="col-span-3 border border-gray-300 bg-gray-100 shadow-md rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={changeEventHandler}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="file" className="text-right">
                  Resume
                </label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  className="col-span-3 border border-gray-300 bg-gray-100 shadow-md rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  accept="application/pdf"
                  onChange={fileChangeHandler}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className={`w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
                aria-live="polite"
              >
                <div className="flex justify-center items-center">
                  {loading ? <Loader2 /> : "Update"}
                </div>
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
