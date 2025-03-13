import { useChatStore } from "../store/useChatStore";
import SideBar from "../components/SideBar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className=" bg-base-300">
      <div className="flex items-center justify-center p-5 px-2"> {/* pt-4 was there*/ }
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-7rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <SideBar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;