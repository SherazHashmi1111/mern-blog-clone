import BlogCard from "@/components/BlogCard";
import { Card } from "@/components/ui/card";
import { getEnv } from "@/helpers/getEnv";
import React, { useEffect, useState } from "react";
import img from "../assets/img.jpg";
import Loading from "@/helpers/Loading";

function Index() {
  const [blogs, setBlogs] = useState([]); // state for blogs
  const [loading, setLoading] = useState(false);
  //Fetch Blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${getEnv("VITE_API_BASE_URL")}/blog/all`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch blogs");
        }

        const data = await res.json();
        setBlogs(data); // store blogs in state
        setLoading(false);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) return <Loading />;
  return (
    <Card
      className={
        " mt-5 md:mt-24 w-[98%] mx-auto px-5 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 place-items-center "
      }
    >
      {blogs && blogs?.blogs?.length > 0 ? (
        blogs.blogs.map((item) => (
          
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
        <div className="text-2xl font-bold col-span-3">No data found</div>
      )}
    </Card>
  );
}

export default Index;