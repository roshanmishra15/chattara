import { useSelector } from "react-redux";
import OtherUser from "./OtherUser";
import useGetOtherUsers from "../hooks/useGetOtherUsers";

function OtherUsers() {
  useGetOtherUsers();

  const otherUsers = useSelector(
    (state) => state.user.otherUsers
  );

  return (
    <div className="flex-1 overflow-y-auto space-y-1 pr-1">
      {otherUsers && otherUsers.length > 0 ? (
        otherUsers.map((user) => (
          <OtherUser key={user._id} user={user} />
        ))
      ) : (
        <p className="text-gray-400 text-center mt-4">
          No users found
        </p>
      )}
    </div>
  );
}

export default OtherUsers;
