import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./Skeleton/SideBarSkeleton";
import { Users } from "lucide-react";
import avatar from '../assets/avatar.jpg';

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers, authUser } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  useEffect(() => {
    console.log("Auth User Data:", authUser);
  }, [authUser]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      {/* Sidebar Header */}
      <div className="border-b border-base-300 w-full px-6 py-5">
        <div className="flex items-center gap-2">
          <Users className="size-6 text-gray-500" />
          <span className="font-medium text-xl hidden lg:block">Contacts</span>
        </div>

        {/* Online Users Toggle */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
        </div>
      </div>

      {/* User List */}
      <div className="overflow-y-auto w-full py-2">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`flex items-center gap-3 px-4 py-3  my-1 rounded-lg w-full
              transition-all duration-200 cursor-pointer
              hover:bg-base-200 hover:shadow-md
              ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300 shadow" : ""}`}
          >
            {/* Profile Picture */}
            <div className="relative">
            <img
  src={user.profilePic || avatar}
  alt={user.fullName}
  className="size-12 object-cover mask mask-circle border border-gray-300"
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

        {/* No Users Available */}
        {filteredUsers.length === 0 && (
          <div className="text-center text-gray-500 py-4">No online users</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
