import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SideBarSkeleton from "./skeletons/SideBarSkeleton";
import { Search, VolumeX, Pin, MoreVertical } from "lucide-react";
import { formatRelativeTime, truncateText } from "../lib/utils";

const Sidebar = () => {
  const { getUsers, users = [], selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { authUser } = useAuthStore();
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
      <div className="px-4 py-3 flex justify-between items-center border-b border-base-300 bg-base-100">
        <h2 className="text-lg font-bold">
          Chats
        </h2>
        <button className="p-1.5 rounded-full hover:bg-base-200 hover:scale-110 transition-all" aria-label="More options">
          <MoreVertical className="size-5" />
        </button>
      </div>

      {/* 🔍 Search Bar */}
      <div className="px-3 py-3 border-b border-base-300 bg-base-100">
        <div className="relative group">
          <Search className="absolute left-3 top-2.5 size-4 text-base-content/40 group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search or start a new chat"
            className="w-full pl-10 pr-3 py-2 rounded-lg text-sm bg-base-200 border-2 border-transparent 
              focus:border-primary focus:bg-base-100 focus:shadow-lg transition-all"
          />
        </div>
      </div>

      {/* 🔽 Chat List */}
      <div className="overflow-y-auto flex-1 scrollbar-thin p-2 space-y-2">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => {
            const lastMsg = user.lastMessage;
            const lastMsgText = lastMsg?.image ? "📷 Photo" : lastMsg?.text || "Start chatting";
            const isSentByMe = lastMsg?.senderId === authUser?._id;
            
            return (
              <button
                key={user._id}
                onClick={() => setSelectedUser(user)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200
                  hover:shadow-md hover:-translate-y-0.5 
                  ${
                    selectedUser?._id === user._id 
                      ? "bg-base-300 shadow-md border-2 border-base-content/20" 
                      : "bg-base-100 hover:bg-base-200 border-2 border-transparent"
                  }`}
              >
                {/* Profile Picture */}
                <div className="relative">
                  <div className="avatar">
                    <div className="size-12 rounded-full">
                      <img
                        src={user.profilePic || "/avatar.png"}
                        alt={user.fullName}
                        className="object-cover"
                      />
                    </div>
                  </div>
                  {user.isOnline && (
                    <span className="absolute bottom-0 right-0 bg-green-500 w-3.5 h-3.5 rounded-full 
                      border-2 border-base-100 animate-pulse shadow-lg"></span>
                  )}
                </div>

                {/* Chat Info */}
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold truncate">{user.fullName}</span>
                    <span className="text-xs text-base-content/50 font-medium">
                      {formatRelativeTime(lastMsg?.createdAt)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-base-content/60">
                    <span className="truncate w-40">
                      {isSentByMe && "You: "}{truncateText(lastMsgText, 25)}
                    </span>
                    <div className="flex items-center gap-1">
                      {user.isMuted && <VolumeX className="size-4 text-base-content/40" />}
                      {user.isPinned && <Pin className="size-4 text-warning" />}
                      {user.unreadCount > 0 && (
                        <span className="bg-gradient-to-r from-primary to-secondary text-primary-content 
                          text-xs px-2 py-0.5 rounded-full font-bold shadow-lg animate-pulse">
                          {user.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            );
          })
        ) : (
          <div className="text-center text-base-content/50 py-8">
            {searchQuery ? "No users found" : "No chats yet"}
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
