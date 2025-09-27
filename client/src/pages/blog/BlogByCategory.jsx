import BlogCard from "@/components/BlogCard";
import { Card } from "@/components/ui/card";
import Loading from "@/components/ui/loding";
import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/useFetch";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

function BlogByCategory() {
  const { category } = useParams();

  
  const { data, error, loading } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/blog/get-blog-by-category/${category}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-24">
        Error: {error.message || "Something went wrong"}
      </div>
    );
  }

  return (
    <div className="mt-24 w-[98%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 place-items-center">
      {data && data?.blog?.length > 0 ? (
        data.blog.map((item) => (
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
        <Card className="p-5 text-center w-full col-span-3">
          No blogs found in this category.
        </Card>
      )}
    </div>
  );
}

export default BlogByCategory;