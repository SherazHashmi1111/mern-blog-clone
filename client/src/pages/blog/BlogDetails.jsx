import React, { useEffect, useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { RouteAddBolg, RouteUpdateBlog } from "@/helpers/RouteNames";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import  useFetch  from "@/hooks/useFetch";
import { getEnv } from "@/helpers/getEnv";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { deleteData } from "@/helpers/handleDelete";
import { showToast } from "@/helpers/showToast";

function BlogDetails() {
  const [refreshData, setRefreshData] = useState();
  const [blogs, setBlogs] = useState([]); // state for blogs

  //Fetch Blogs
  useEffect(() => {
    const fetchBlogs = async () => {
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
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchBlogs();
  }, [refreshData]);

  //Deleting blog logic
  const handleDelete = async (id) => {
    const response = await deleteData(
      `${getEnv("VITE_API_BASE_URL")}/blog/delete/${id}`
    );

    if (response) {
      setRefreshData(!refreshData);
      showToast("Success", "Blog Deleted");
    } else {
      showToast("Error", "Blog Not Deleted");
    }
  };

  return (
    <div>
      <div className="">
        <Card className="max-w-[95%] mx-4 mt-20">
          <CardHeader>
            <Button className="cursor-pointer md:w-24 " asChild>
              <Link to={RouteAddBolg}>Add Blog</Link>
            </Button>
          </CardHeader>
          <CardContent className={`w-full`}>
            <Table className="md:text-sm text-[.5rem]">
              <TableHeader>
                <TableRow>
                  <TableHead>Author</TableHead>
                  <TableHead>Category Name</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blogs && blogs?.blogs?.length > 0 ? (
                  blogs.blogs.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell
                        className={`w-[17%] whitespace-normal break-words`}
                      >
                        {item.author.name}
                      </TableCell>
                      <TableCell
                        className={`w-[17%] whitespace-normal break-words`}
                      >
                        {item.category.name}
                      </TableCell>
                      <TableCell
                        className={`w-[17%] whitespace-normal break-words`}
                      >
                        {item.title}
                      </TableCell>
                      <TableCell
                        className={`w-[17%] whitespace-normal break-words`}
                      >
                        {item.slug}
                      </TableCell>
                      <TableCell
                        className={`w-[17%] whitespace-normal break-words`}
                      >
                        {new Date(item.createdAt).toLocaleString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </TableCell>
                      <TableCell className="whitespace-normal overflow-x-auto max-w-[150px]">
                        <div className="flex items-center">
                          <Button
                            className="cursor-pointer p-1 text-xs md:p-2 md:text-sm"
                            asChild
                          >
                            <Link to={RouteUpdateBlog(item._id)}>
                              <FaRegEdit />
                            </Link>
                          </Button>
                          <Button
                            className="cursor-pointer ml-2 p-1 text-xs md:p-2 md:text-sm"
                            variant="destructive"
                            onClick={() => handleDelete(item._id)}
                          >
                            <MdDeleteForever />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan="3" className={`text-center`}>
                      Data not found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default BlogDetails;