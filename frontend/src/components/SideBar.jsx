import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import SideBarSkeleton from "./skeletons/SideBarSkeleton";
import { Search, VolumeX, Pin, MoreVertical } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users = [], selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getUsers?.();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isUsersLoading) return <SideBarSkeleton />;

  return (
    <aside className="h-full w-[325px] border-r border-base-300 flex flex-col transition-all duration-200">
      {/* 🔝 Header */}
      <div className="px-4 py-2 flex justify-between items-center border-b border-base-300">
        <h2 className="text-lg font-semibold">Chats</h2>
        <button className="p-1 rounded-full hover:bg-base-200 transition">
          <MoreVertical className="size-5" />
        </button>
      </div>

      {/* 🔍 Search Bar */}
      <div className="px-3 py-2 border-b border-base-300">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 size-4 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search or start a new chat"
            className="w-full pl-8 pr-2 py-2 rounded-md text-sm bg-base-200"
          />
        </div>
      </div>

      {/* 🔽 Chat List */}
      <div className="overflow-y-auto flex-1">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`w-full flex items-center gap-3 p-3 hover:bg-base-100 transition-colors ${
                selectedUser?._id === user._id ? "bg-base-300" : ""
              }`}
            >
              {/* Profile Picture */}
              <div className="relative">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.fullName}
                  className="size-12 rounded-full object-cover"
                />
                {user.isOnline && (
                  <span className="absolute bottom-0 right-0 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></span>
                )}
              </div>

              {/* Chat Info */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <span className="font-medium truncate">{user.fullName}</span>
                  <span className="text-xs text-zinc-400">12:34</span> {/* Dummy Time */}
                </div>
                <div className="flex justify-between items-center text-sm text-zinc-500">
                  <span className="truncate w-40">Last message preview...</span> {/* Dummy Message */}
                  <div className="flex items-center gap-1">
                    {user.isMuted && <VolumeX className="size-4 text-zinc-500" />}
                    {user.isPinned && <Pin className="size-4 text-zinc-500" />}
                    {user.unreadCount > 0 && (
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        {user.unreadCount}
                      </span>
                    )}
                  </div>
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
