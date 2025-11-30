import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser, typingUsers } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const isTyping = typingUsers.has(selectedUser?._id);

  return (
    <div className="p-3 border-b border-base-300 bg-base-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
              {onlineUsers.includes(selectedUser._id) && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-base-100"></span>
              )}
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-semibold text-base">{selectedUser.fullName}</h3>
            <p className="text-xs text-base-content/70 flex items-center gap-1">
              {isTyping ? (
                <span className="text-primary flex items-center gap-1">
                  <span className="loading loading-dots loading-xs"></span>
                  typing...
                </span>
              ) : onlineUsers.includes(selectedUser._id) ? (
                <>
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Online
                </>
              ) : (
                "Offline"
              )}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button 
          onClick={() => setSelectedUser(null)}
          className="btn btn-ghost btn-sm btn-circle hover:bg-base-200"
          aria-label="Close chat"
        >
          <X className="size-5" />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;
