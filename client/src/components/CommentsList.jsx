import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast";
import React, { useEffect, useState } from "react";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import userIcon from "../assets/user.png";
import moment from "moment";
import { useSelector } from "react-redux";

function CommentsList({ blogid, newComment }) {
  const user = useSelector((state) => state.user);
  const [comments, setComments] = useState();
  //   Fetch all comments
  useEffect(() => {
    const fetchAllComments = async (req, res, next) => {
      try {
        const res = await fetch(
          `${getEnv("VITE_API_BASE_URL")}/comment/comments/${blogid}`,
          {
            method: "GET",
          }
        );
        const resData = await res.json();
        setComments(resData);
      } catch (error) {
        showToast("error", error?.message || "Something went wrong!");
      }
    };
    fetchAllComments();
  }, []);

  return (
    <div className="">
      <h4 className="text-lg font-bold underline text-orange-500">
        {newComment ? (
          <>{comments && comments?.comments?.length + 1}</>
        ) : (
          <>{comments && comments?.comments?.length}</>
        )}{" "}
        Comments
      </h4>
      {newComment && (
        <div className="border-b py-2">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={user?.user?.user.avatar || userIcon} />
            </Avatar>
            <div className="mb-5">
              <p className="text-xl">{user?.user?.user.name}</p>
              <span className="text-sm">
                {moment(newComment.createdAt).format("MMM Do YY")}
              </span>
            </div>
          </div>
          <p className="ml-10 text-justify text-sm text-gray-700">
            {newComment.comment}
          </p>
        </div>
      )}
      {comments && comments?.comments?.length > 0 ? (
        comments.comments.map((item) => (
          <div className="border-b py-2" key={item._id}>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={item.author.avatar || userIcon} />
              </Avatar>
              <div className="mb-5">
                <p className="text-xl">{item.author.name}</p>
                <span className="text-sm">
                  {moment(item.createdAt).format("MMM Do YY")}
                </span>
              </div>
            </div>
            <p className="ml-10 text-justify text-sm text-gray-700">
              {item.comment}
            </p>
          </div>
        ))
      ) : (
        <div className="border-b py-2">No Comments yet on this post</div>
      )}
    </div>
  );
}

export default CommentsList;