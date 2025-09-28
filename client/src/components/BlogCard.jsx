import React from "react";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { FaCalendarAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RouteBlogDetails } from "@/helpers/RouteNames.js";

function BlogCard({ author, title, featuredImage, date, avatar, category, slug }) {
  const userData = useSelector((state) => state.user);
  const user = userData.user.user;

  return (
    <Card className={"w-75 h-100 overflow-hidden"} key={""}>
      <CardContent>
        {/* Card topbar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Avatar className="lg:w-14 lg:h-14 md:w-10 md:h-10">
              <AvatarImage src={avatar || ''} />
              <AvatarFallback>{author}</AvatarFallback>
            </Avatar>
            <p className="font-bold text-gray-500 ml-2 lg:text-sm md:text-[12px]">{author}</p>
          </div>
          <Button className={"rounded cursor-pointer lg:text-sm md:text-[12px] "} variant={"outline"}>
            <Link to={RouteBlogDetails(category.slug, slug)}>
            Details
            </Link>
          </Button>
        </div>
        {/* Card image */}
        <div className="mt-5">
          <img
            src={featuredImage}
            alt=""
            className="rounded-lg lg:h-36 w-full md:h-24"
          />
        </div>
        <div className="mt-5 flex text-gray-600 items-center">
          <FaCalendarAlt />
          <div className="ml-5 md:text-sm md:ml-2">
            {new Date(date).toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
        <div className="lg:text-2xl md:text-lg  font-bold text-black mt-4">
          <h2>{title}</h2>
        </div>
      </CardContent>
    </Card>
  );
}

export default BlogCard;