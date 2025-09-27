import BlogCard from "@/components/BlogCard";
import { Card } from "@/components/ui/card";
import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast";
import  useFetch  from "@/hooks/useFetch";
import React from "react";
import { useParams } from "react-router-dom";
import { BiCategoryAlt } from "react-icons/bi";

function ByCategoryBlogs() {
  const category = useParams();

  const { data, error, loading } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/blog/blogs-by-category/${
      category.category
    }`,
    {
      method: "GET",
      credentials: "include",
    },
    [category]
  );

  return (
    <Card
      className={
        " mt-24 w-[98%] mx-auto px-5 grid grid-cols-3 gap-5 place-items-center "
      }
    >
      {data && data?.relatedBlogs.length > 0 && (
        <div className="w-full flex items-center gap-2 text-3xl font-bold text-violet-800 mb-5 border-violet-500 col-span-3">
          <BiCategoryAlt />
          {data.categoryData.name}
        </div>
      )}
      {data && data?.relatedBlogs.length > 0 ? (
        data?.relatedBlogs.map((item) => (
          <BlogCard
            key={item._id}
            author={item.author.name}
            title={item.title}
            featuredImage={item.featuredImage}
            date={item.updatedAt}
            avatar={item.author.avatar}
            category={item.category}
            slug={item.slug}
          />
        ))
      ) : (
        <div className="text-center text-2xl font-bold w-full col-span-3 ">
          No data found
        </div>
      )}
    </Card>
  );
}

export default ByCategoryBlogs;