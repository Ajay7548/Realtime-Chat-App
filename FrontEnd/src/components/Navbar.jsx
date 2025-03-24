import React from "react";
import { Link } from "react-router-dom";
import { LogOut, MessageSquare, Moon, Settings, SunIcon, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {

 
  const { logout, authUser } = useAuthStore();
  return (
    <div className=" flex items-center px-4 justify-between ">
      {/* logo  */}
      <div className="flex gap-2 lg:gap-3 items-center px-1  lg:px-8 py-3">
        <div className="size-10 lg:size-12 rounded-xl  flex items-center justify-center group-hover:bg-violet-800 transition-colors">
          <MessageSquare className="size-6 text-primary" />'
        </div>
        <Link to="/" className="text-lg lg:text-xl font-bold">
          Chatty
        </Link>
      </div>

      {/* side content  */}
      <div className="flex gap-2  justify-between">
      

        <Link to={'/setting'} className={`btn btn-sm gap-2`}>
          <Settings className="size-4 lg:size-5" />
          {/* <span className=" hidden text-base sm:inline">Settings</span> */}
        </Link>

        
        

        {authUser && (
          <>
            <Link to={'/profile'} className={`btn btn-sm gap-2`}>
              <User className="size-4 lg:size-5" />
              {/* <span className="hidden text-base sm:inline">Profile</span> */}
            </Link>

            <button className=" btn btn-sm  cursor-pointer flex gap-2 items-center" onClick={logout}>
              <LogOut className="size-4 lg:size-5" />
              {/* <span className="hidden sm:inline">Logout</span> */}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
