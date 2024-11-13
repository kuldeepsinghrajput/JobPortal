import React, { useState } from "react";
import Navbar from "./Shared/Navbar";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import { Badge, Contact, Mail, Pen } from "lucide-react";
import AppliedJobTable from "./AppliedJobTable";
import { Dialog, DialogOverlay, DialogContent } from "@radix-ui/react-dialog";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";

const Profile = () => {
const {user}=useSelector(store=>store.auth);
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-4">
          <div className="h-24 w-24 rounded-full overflow-hidden">
  <Avatar className="h-full w-full">
    <AvatarImage
      src={user?.profile?.profilePhoto}
      className="object-cover h-full w-full"
      alt="Profile Photo"
    />
    <AvatarFallback className="flex items-center justify-center h-full w-full bg-gray-200 text-gray-600 rounded-full">
      {user?.fullname
        ? user.fullname.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
        : 'NA'}
    </AvatarFallback>
  </Avatar>
</div>


            <div>
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p className="text-gray-600">{user?.profile?.bio}</p>
            </div>
          </div>
          <Button className="mt-4 md:mt-0" variant="outline" onClick={toggleEdit}>
            <Pen className="mr-2" />
            Edit
          </Button>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
            <div className="flex items-center gap-3 my-2">
              <Mail />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center gap-3 my-2">
              <Contact />
              <span>{user?.phoneNumber}</span>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {user?.profile?.skills.length === 0 ? (
                <span>NA</span>
              ) : (
                user?.profile?.skills.map((item, index) => (
                  <span
                    key={index}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    {item}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <label className="text-md font-bold">Resume</label>
          {user?.profile?.resume ? (
  <a
    target="_blank"
    href={user?.profile?.resume}
    className="text-blue-500 w-full hover:underline cursor-pointer"
  >
    {user?.profile?.resumeOriginalName}
  </a>
) : (
  <span>NA</span>
)}
        </div>
      </div>
      <div className="max-w-7xl mx-auto my-5 p-8">
        <h2 className="text-lg font-semibold mb-4">Applied Jobs</h2>
        <AppliedJobTable />
      </div>
      <UpdateProfileDialog
        open={isEditing}
        setOpen={setIsEditing}
         />    </div>
  );
};

export default Profile;
