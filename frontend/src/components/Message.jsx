import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

function Message({ message }) {
  const { authUser } = useSelector((store) => store.user);
  const scrollRef = useRef(null);

  if (!message) return null;

  const senderId =
    typeof message.senderId === "object"
      ? message.senderId._id
      : message.senderId;

  const isOutgoing =
    authUser && String(senderId) === String(authUser._id);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  console.log("AUTH USER:", authUser);

  return (
    <div
      ref={scrollRef}
      className={`flex ${isOutgoing ? "justify-end" : "justify-start"} mb-2`}
    >
      <div className="flex items-end gap-2 max-w-md">
        {!isOutgoing && (
          <img
            src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
        )}

        <div
          className={`px-4 py-2 rounded-xl text-sm break-words break-all max-w-xs sm:max-w-md ${isOutgoing
              ? "bg-purple-600 text-white rounded-br-none"
              : "bg-white text-slate-800 shadow rounded-bl-none"
            }`}
        >
          {message.message}
          <div className="text-[10px] mt-1 opacity-60 text-right">
            {new Date(message.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
