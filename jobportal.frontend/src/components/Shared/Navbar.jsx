import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogOut, User2 } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { store } from "@/redux/store";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`);
      toast.success(res.data.message);
      dispatch(setUser(null));
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const { user } = useSelector((store) => store.auth); // Replace with actual user state
  return (
    <div className="bg-white shadow-md">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#f83002]">Portal</span>
          </h1>
        </div>
        <div className="flex-grow"></div>
        <div>
          <ul className="flex font-medium items-center gap-5">
          {user?.role === 'recruiter' ? (
        <>
          <li className="hover:text-[#f83002] cursor-pointer">
            <Link to="/admin/companies">Companies</Link>
          </li>
          <li className="hover:text-[#f83002] cursor-pointer">
            <Link to="/admin/jobs">Jobs</Link>
          </li>
        </>
      ) : (
        <><li className="hover:text-[#f83002] cursor-pointer">
        <Link to="/">Home</Link>
      </li>
          <li className="hover:text-[#f83002] cursor-pointer">
            <Link to="/Jobs">Jobs</Link>
          </li>
          <li className="hover:text-[#d6d6d6] cursor-pointer">
            <Link to="/browse">Browse</Link>
          </li>
        </>
      )}
            <li>
              {user ? (
                <Popover>
                  <PopoverTrigger>
                    <Avatar>
                      <AvatarImage src={user?.profile?.profilePhoto} />
                      <AvatarFallback>
                        {user?.fullname
                          ? user.fullname
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()
                              .slice(0, 2)
                          : "NA"}
                      </AvatarFallback>
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="flex gap-4 space-y-2">
                      <Avatar className="cursor-pointer">
                        <AvatarImage src={user?.profile?.profilePhoto} />
                        <AvatarFallback>
                          {" "}
                          {user?.fullname
                            ? user.fullname
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()
                                .slice(0, 2)
                            : "NA"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{user.fullname}</h4>
                        <p className="text-sm text-gray-500">
                          {user.profile.bio}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col my-2 text-gray-600">
                    {user?.role !== "recruiter" && (
      <div className="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-100 rounded-md">
        <User2 className="text-blue-500" />
        <div className="flex-grow text-center">
          <Button variant="link" className="text-blue-500">
            <Link to={"/profile"}>View Profile</Link>
          </Button>
        </div>
      </div>
    )}
                      <div className="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-100 rounded-md mt-2">
                        <LogOut className="text-red-500" />
                        <div className="flex-grow text-center">
                          <Button
                            variant="link"
                            onClick={logoutHandler}
                            className="text-red-500"
                          >
                            Logout
                          </Button>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              ) : (
                <div className="flex gap-4">
                  <Link to="/login">
                    {" "}
                    <Button
                      variant="link"
                      className="text-black bg-transparent border border-gray-300 rounded-full px-4 py-2 transition duration-300 ease-in-out hover:bg-blue-500 hover:text-white hover:border-blue-500"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button
                      variant="link"
                      className="text-black bg-transparent border border-gray-300 rounded-full px-4 py-2 transition duration-300 ease-in-out hover:bg-green-500 hover:text-white hover:border-green-500"
                    >
                      Signup
                    </Button>
                  </Link>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
