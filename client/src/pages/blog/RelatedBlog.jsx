import React from "react";
import { getEnv } from "@/helpers/getEnv";
import { Link } from "react-router-dom";
import { RouteBlogDetails } from "@/helpers/RouteNames";
import useFetch from "@/hooks/useFetch";
import Loading from "@/helpers/Loading";

function RelatedBlog({ blog, category }) {
  const { data, error, loading } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/blog/related-blog/${category}/${blog}`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  // console.log(data.relatedBlogs);

  if (loading) return <Loading/>;
  if (error) return <p>Error loading related blogs.</p>;

  return (
    <div className="related-blogs p-4">
      <h3 className="text-lg font-semibold mb-2">Related Blogs</h3>
      <ul className="space-y-2 flex flex-col gap-3 ">
        {data && data.relatedBlogs.length > 0 ? (
          data.relatedBlogs.map((item) => (
            <Link
              key={item._id}
              to={RouteBlogDetails(item.category.slug, item.slug)}
            >
              <div className="flex gap-2">
                <div className="w-[40%] h-15">
                  <img
                    src={item.featuredImage}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-[50%]">
                  <h4 className="text-sm text-justify">{item.title}</h4>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="">No related blog</div>
        )}
      </ul>
    </div>
  );
}

export default RelatedBlog;