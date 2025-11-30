import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header
      className="bg-gradient-to-r from-primary/20 via-base-100 to-secondary/20 
      border-b border-primary/30 fixed w-full top-0 z-40 
      backdrop-blur-xl bg-base-100/90 shadow-lg"
    >
      <div className="lg:px-4 h-16">
        <div className="flex items-center px-4 justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all group">
              <div className="size-10 rounded-lg bg-gradient-to-br from-primary to-secondary 
                flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <MessageSquare className="w-5 h-5 text-primary-content" />
              </div>
              <h1 className="text-lg lg:text-xl font-bold bg-gradient-to-r from-primary to-secondary 
                bg-clip-text text-transparent">ZapChat</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={"/settings"}
              className="btn btn-sm gap-2 transition-all hover:scale-105 hover:shadow-lg"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link to={"/profile"} className="btn btn-sm gap-2 transition-all hover:scale-105 hover:shadow-lg">
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button className="flex gap-2 items-center btn btn-sm btn-error transition-all hover:scale-105 hover:shadow-lg" onClick={logout}>
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
