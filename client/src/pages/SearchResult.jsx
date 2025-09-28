import BlogCard from "@/components/BlogCard";
import { Card } from "@/components/ui/card";
import { getEnv } from "@/helpers/getEnv";
import Loading from "@/helpers/Loading";
import useFetch from "@/hooks/useFetch";
import React from "react";
import { useSearchParams } from "react-router-dom";

function SearchResult() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");

  const { data, error, loading } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/blog/search?q=${q}`,
    {
      method: "GET",
      credentials: "include",
    },
    [q]
  );

  if (loading) return <Loading />;
  return (
    <div className="p-5 flex gap-5 flex-wrap items-center justify-center">
      {data && data?.blogs?.length > 0 ? (
        data.blogs.map((item) => (
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
        <div>No data found</div>
      )}
    </div>
  );
}

export default SearchResult;
