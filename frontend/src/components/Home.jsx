import React from "react";
import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";

function Home() {
  return (
    <div className="h-screen flex bg-gray-100 p-4">
      <div className="flex w-full rounded-2xl overflow-hidden shadow-xl bg-white">
        <Sidebar />
        <MessageContainer />
      </div>
    </div>
  );
}

export default Home;
