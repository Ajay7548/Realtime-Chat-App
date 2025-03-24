import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./Skeleton/SideBarSkeleton";
import { Users, Search } from "lucide-react";
import avatar from "../assets/avatar.jpg";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
<<<<<<< HEAD
  const { onlineUsers, authUser } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
=======
  const { onlineUsers } = useAuthStore();
>>>>>>> b9b408ef095908d35808851a64a6c8549950f1f7
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getUsers();
  }, [getUsers]);

<<<<<<< HEAD
  useEffect(() => {
    console.log("Auth User Data:", authUser);
  }, [authUser]);

  const filteredUsers = users.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!showOnlineOnly || onlineUsers.includes(user._id))
  );
  
  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 bg-base-300 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
=======
  const filteredUsers = users.filter((user) =>
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full bg-base-300 w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
>>>>>>> b9b408ef095908d35808851a64a6c8549950f1f7
      {/* Sidebar Header */}
      <div className="border-b border-base-300 w-full px-4 py-2">
        <div className="flex items-center gap-2">
          <Users className="size-5 lg:size-6 text-gray-500" />
          <span className="font-medium text-xl hidden lg:block">Contacts</span>
        </div>

<<<<<<< HEAD
        {/* Online Users Toggle */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
  <input
    type="text"
    placeholder="Search user..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="input input-sm border rounded px-2 py-1 w-full"
  />
</div>

=======
      
        {/* Search Bar */}
        <div className="mt-3 relative hidden lg:block">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute right-3 top-2.5 size-4 text-gray-400" />
        </div>
>>>>>>> b9b408ef095908d35808851a64a6c8549950f1f7
      </div>

      {/* User List */}
      <div className="overflow-y-auto w-full py-2">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`flex items-center gap-3 px-4 py-3 my-1 rounded-lg w-full
              transition-all duration-200 cursor-pointer
              hover:bg-base-100 hover:shadow-md
              ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300 shadow" : ""}`}
          >
            {/* Profile Picture */}
            <div className="relative">
              <img
                src={user.profilePic || avatar}
                alt={user.fullName}
                className="size-10 lg:size-12 object-cover mask mask-circle border border-gray-300"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-1 right-1 size-3 bg-green-500 rounded-full ring-2 ring-white" />
              )}
            </div>

            {/* User Info */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-gray-500">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {/* No Users Found */}
        {filteredUsers.length === 0 && (
          <div className="text-center text-gray-500 py-4">No users found</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
