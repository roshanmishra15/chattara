import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOtherUsers } from "../redux/userSlice";

function useGetOtherUsers() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchOtherUsers = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials:true
          }
        );

        dispatch(setOtherUsers(res.data)); // ✅ store update
      } catch (error) {
        console.error(error);
      }
    };

    fetchOtherUsers();
  }, [dispatch]);
}

export default useGetOtherUsers;
