import React, { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast";

function LikeCount({ blogid }) {
  // Local state to keep track of the current like count for the blog
  const [likeCount, setLikeCount] = useState(0);
  

  // Extract user info from Redux store
  const user = useSelector((state) => state.user);
  const userid = user?.user?.user?.id;
  

  // Fetch the current total like count when component mounts or blogid changes
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await fetch(
          `${getEnv("VITE_API_BASE_URL")}/like/like-count/${blogid}`
        );

        if (!response.ok) {
          toast.error("Failed to fetch like count.");
          return;
        }

        const resData = await response.json();

        // Update local likeCount state with fetched data
        setLikeCount(resData.likeCount);
      } catch (error) {
        toast.error("An error occurred while fetching likes.");
        console.error("Fetch Likes Error:", error);
      }
    };

    fetchLikes();
  }, [blogid]);

  // Handles toggling like/unlike for the current user on the blog
  const likeHandler = async () => {
    // Prevent like action if user is not logged in
    if (!user.isLoggedIn) {
      return showToast("error", "Please login to your account first");
    }

    try {
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/like/do-like`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ blogid, userid }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        return showToast("error", errorText || response.statusText);
      }

      const resData = await response.json();

      // Update likeCount based on the latest total from the server
      setLikeCount(resData.totalLike);
    } catch (error) {
      showToast("error", error.message);
      console.error("Like Handler Error:", error);
    }
  };

  return (
    <button
      onClick={likeHandler}
      className="flex items-center gap-1"
      aria-label="Like button"
    >
      {/* Display current like count */}
      {likeCount}

      {/* Like icon with styling that changes if likes are present */}
      <AiFillLike
        className={`${
          likeCount
            ? "text-blue-700 text-xl transition-all duration-150"
            : "text-gray-400 text-xl transition-all duration-150"
        }`}
      />
    </button>
  );
}

export default LikeCount;