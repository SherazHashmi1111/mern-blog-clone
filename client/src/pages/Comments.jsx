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
import { getEnv } from "@/helpers/getEnv";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { deleteData } from "@/helpers/handleDelete";
import { showToast } from "@/helpers/showToast";
import moment from "moment";

function Comments() {
  const [refreshData, setRefreshData] = useState();
  const [comments, setComments] = useState([]); // state for comments

  //Fetch Blogs
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`${getEnv("VITE_API_BASE_URL")}/comment/all`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch comments");
        }

        const data = await res.json();
        setComments(data); // store comments in state
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchComments();
  }, [refreshData]);

  //Deleting blog logic
  const handleDelete = async (id) => {
  const response = await deleteData(
    `${getEnv("VITE_API_BASE_URL")}/comment/delete/${id}`
  );

  if (response) {
    setRefreshData(!refreshData);
    showToast("Success", "Comment Deleted");
  } else {
    showToast("Error", "Comment Not Deleted");
  }
};


  return (
    <div>
      <div className="">
        <Card className="max-w-[95%] mx-4 mt-20">
          
          <CardContent className={`w-full`}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Blog</TableHead>
                  <TableHead>Commented By</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comments && comments?.comments?.length > 0 ? (
                  comments.comments.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell
                        className={`w-[17%] whitespace-normal break-words`}
                      >
                        {item.blogid.title}
                      </TableCell>
                      <TableCell
                        className={`w-[17%] whitespace-normal break-words`}
                      >
                        {item.author.name}
                      </TableCell>
                      
                      <TableCell
                        className={`w-[17%] whitespace-normal break-words`}
                      >
                        {moment(item.createdAt).format("MMM Do YY")}
                      </TableCell>
                      
                      <TableCell
                        className={`w-[17%] whitespace-normal break-words`}
                      >
                        
                        <Button
                          className={`cursor-pointer ml-3`}
                          variant="destructive"
                          onClick={() => handleDelete(item._id)}
                        >
                          <MdDeleteForever />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow >
                    <TableCell colSpan="4" className={`text-center py-10 text-3xl font-bold`}>
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

export default Comments;