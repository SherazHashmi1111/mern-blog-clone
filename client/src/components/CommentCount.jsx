import React from "react";
import { FaRegComment } from "react-icons/fa";
import { getEnv } from "@/helpers/getEnv";
import { FaComment } from "react-icons/fa";
import useFetch from "@/hooks/useFetch";
function CommentCount({ blogid }) {
  //   Fetch all comments
  const { data, error, loading } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/comment/comment-count/${blogid}`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  
  return (
    <div>
      {data && data?.commentCount ? (
        <div className="flex gap-1 items-center ">
           {data.commentCount}  <FaComment />
        </div>
      ) : (
        <div>
          <FaRegComment /> 
        </div>
      )}
    </div>
  );
}

export default CommentCount;