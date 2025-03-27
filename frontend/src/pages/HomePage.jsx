import { useState, useEffect } from "react";
import { useChatStore } from "../store/useChatStore";

import SideBar from '../components/SideBar';
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Check if it's mobile

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100  rounded-lg shadow-cl w-full max-w-[1350px] h-[calc(100vh-6rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            {/* Hide sidebar on mobile when a chat is selected */}
            {(!isMobile || !selectedUser) && <div>
              {
                <SideBar/>
              }
              </div>}
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
