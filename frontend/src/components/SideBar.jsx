import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SideBarSkeleton from './skeletons/SideBarSkeleton'
import { Users, Search } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users = [], selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getUsers?.();
  }, []);

  // Filter users based on search query
  const filteredUsers = users.filter((user) =>
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isUsersLoading) return <SideBarSkeleton />;

  return (
    <aside className="h-full bg-base-300 w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-5" />
          <span className="font-medium text-lg lg:text-xl  hidden lg:block">Contacts</span>
        </div>

        {/* 🔍 Search Input */}
        <div className="mt-3 relative">
          <Search className="absolute left-2 top-2.5 size-4 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users..."
            className="w-full pl-8 pr-2 py-2 border rounded-md text-sm bg-base-200"
          />
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`w-full p-3 flex items-center gap-3 hover:bg-base-100 transition-colors ${
                selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""
              }`}
            >
              <div className="relative mx-auto lg:mx-0">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.name}
                  className="size-12 object-cover rounded-full"
                />
              </div>

              {/* User info - only visible on larger screens */}
              <div className="hidden lg:block text-left min-w-0">
                <div className="font-medium truncate">{user.fullName}</div>
                <div className="text-sm text-zinc-400">
                  {user.isOnline ? "Online" : "Offline"}
                </div>
              </div>
            </button>
          ))
        ) : (
          <div className="text-center text-zinc-500 py-4">No users found</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
