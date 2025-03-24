import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import avatar  from "../assets/avatar.jpg";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers, authUser } = useAuthStore();

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar p-1">
            <div className="size-8 lg:size-10 rounded-full relative">
            <img
                src={
                  selectedUser._id === authUser._id
                    ? `${authUser.profilePic || avatar}?t=${new Date().getTime()}`
                    : selectedUser.profilePic || avatar
                }
                alt={selectedUser.fullName}
                className="size-12 object-cover rounded-full"
              />            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium text-md">{selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button
        className="p-2 cursor-pointer"
        onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;