import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header
<<<<<<< HEAD
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80"
    >
      <div className=" mx-auto px-4 h-18  ">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg lg:text-xl font-bold">Chatty</h1>
=======
      className="bg-base-100 border-b border-base-300 fixed w-full  top-0 z-40 
    backdrop-blur-lg bg-base-100/80"
    >
      <div className="mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center lg:px-2 gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-xl font-bold">Chatty</h1>
>>>>>>> b9b408ef095908d35808851a64a6c8549950f1f7
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={"/setting"}
              className={`
<<<<<<< HEAD
              btn btn-md gap-2 transition-colors
              
              `}
            >
              <Settings className="w-4 h-5 " />
=======
              btn btn-sm gap-2 transition-colors
              
              `}
            >
              <Settings className="w-4 h-4" />
>>>>>>> b9b408ef095908d35808851a64a6c8549950f1f7
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
<<<<<<< HEAD
                <Link to={"/profile"} className={`btn btn-md gap-2`}>
=======
                <Link to={"/profile"} className={`btn btn-sm gap-2`}>
>>>>>>> b9b408ef095908d35808851a64a6c8549950f1f7
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

<<<<<<< HEAD
                <button className="flex gap-2 items-center btn btn-md" onClick={logout}>
=======
                <button className="flex gap-2 items-center btn btn-sm" onClick={logout}>
>>>>>>> b9b408ef095908d35808851a64a6c8549950f1f7
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;