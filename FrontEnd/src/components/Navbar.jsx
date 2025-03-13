import React from "react";
import { Link } from "react-router-dom";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  return (
    <div className="flex items-center px-4 justify-between ">
      {/* logo  */}
      <div className="flex gap-3 items-center px-8 py-3">
        <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <MessageSquare className="size-6 text-primary" />'
        </div>
        <Link to="/" className="text-xl font-bold">
          Chatty
        </Link>
      </div>

      {/* side content  */}
      <div className="flex gap-4 px-4 justify-between">
        <Link to={'/setting'} className={`btn btn-sm gap-2`}>
          <User className="size-5" />
          <span className=" text-base sm:inline">Settings</span>
        </Link>

        {authUser && (
          <>
            <Link to={'/profile'} className={`btn btn-sm gap-2`}>
              <User className="size-5" />
              <span className="hidden text-base sm:inline">Profile</span>
            </Link>

            <button className=" cursor-pointer flex gap-2 items-center" onClick={logout}>
              <LogOut className="size-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
