import React from "react";
import Message from "./Message";
import { useSelector } from "react-redux";
import useGetMessages from "../hooks/useGetMessages";
import useGetRealTimeMessage from "../hooks/useGetRealTimeMessage";

function Messages() {
  const selectedUser = useSelector((store) => store.user.selectedUser);
  const messages = useSelector((store) => store.message.messages || []);

  // 🔥 Fetch ONLY when selectedUser changes
  useGetMessages(selectedUser?._id);

  // 🔥 Real-time listener (no dependency on selectedUser)
  useGetRealTimeMessage();

  return (
    <div className="flex-1 px-4 py-4 overflow-y-auto space-y-4">
      {messages.length === 0 ? (
        <p className="text-center text-gray-400 text-sm">
          No messages yet. Start the conversation.
        </p>
      ) : (
        messages.map((message) => (
          <Message key={message._id} message={message} />
        ))
      )}
    </div>
  );
}

export default Messages;
