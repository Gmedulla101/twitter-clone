import SideBar from '../components/SideBar';
import {
  socket,
  selectedUsername,
  selectedRoom,
} from '../custom hooks/useSocket';

console.log(selectedRoom, selectedUsername);

const Chat = () => {
  return (
    <>
      <SideBar />
      <section className="ml-12 flex flex-col relative">
        <div className="shadow p-2 w-full">
          <h1 className="font-semibold text-2xl">
            {selectedUsername || 'Live Chat'}
          </h1>
        </div>
        <div className="w-full h-[85vh]">
          <h3 className="font-semibold text-3xl text-center my-[35vh]">
            All your chats will appear{' '}
            <span className="text-blue-500">here</span>
          </h3>
        </div>
        <div className="px-2 absolute w-full top-full">
          <input
            type="text"
            placeholder="Type in your message"
            className="border-2 border-slate-200 py-2 px-4 outline-none rounded-lg w-full focus:border-blue-500"
          />
        </div>
      </section>
    </>
  );
};

export default Chat;
