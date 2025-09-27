import React, { useEffect } from "react";

import { getEnv } from "@/helpers/getEnv";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useFetch } from "@/hooks/useFetch";
import { useParams } from "react-router-dom";
import { decode } from "entities";
import Comment from "@/components/Comment";
import CommentCount from "@/components/CommentCount";
import LikeCount from "@/components/LikeCount";
import RelatedBlog from "./RelatedBlog";
function SingleBlogDetails() {
  const { blog, category } = useParams();

  // Blog data fetched from DB
  const { data, error, loading } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/blog/blog-details/${blog}`,
    {
      method: "GET",
      credentials: "include",
    },
    [blog, category]
  );

  return (
    <div className="w-full flex flex-col md:flex-row gap-5 pt-10 px-4 mx-auto">
      {data && data?.blog && (
        <div className="md:w-[70%] w-full border-2 p-4 ">
          <div className="flex md:flex-row flex-col items-center justify-between ">
            <div className="w-full flex md:flex-row flex-col gap-3 items-center p-4">
              <Avatar className="w-25 h-25">
                <AvatarImage src={data.blog.author.avatar} />
              </Avatar>
              <div className="flex flex-col text-gray-600">
                <span className="font-bold">{data.blog.author.name}</span>
                <p className="text-sm">
                  {new Date(data.blog.createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
            <div
              className={"mr-4 cursor-pointer flex gap-5"}
              variant={"outline"}
            >
              <CommentCount blogid={data.blog._id} />
              <LikeCount blogid={data.blog._id} />
            </div>
          </div>
          <div className="w-full h-50 md:h-100 my-4 mx-auto">
            <img
              src={data.blog.featuredImage}
              alt=""
              className="rounded w-full h-full object-cover"
            />
          </div>
          <h1 className=" text-2xl font-bold py-2">{data.blog.title}</h1>
          <div
            className=" text-justify py-2"
            dangerouslySetInnerHTML={{ __html: decode(data.blog.blogContent) }}
          ></div>
          <Comment blogid={data.blog._id} />
        </div>
      )}
      <div className="md:w-[25%] w-full border-2 ">
        <RelatedBlog blog={blog} category={category} />
      </div>
    </div>
  );
}

export default SingleBlogDetails;