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
import userPng from "../assets/user.png";

function Users() {
  const [refreshData, setRefreshData] = useState();
  const [users, setUsers] = useState([]); // state for users

  //Fetch Blogs
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${getEnv("VITE_API_BASE_URL")}/user/all`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await res.json();
        setUsers(data); // store users in state
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchUsers();
  }, [refreshData]);

  //Deleting blog logic
  const handleDelete = async (id) => {
    const response = await deleteData(
      `${getEnv("VITE_API_BASE_URL")}/user/delete/${id}`
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
        <Card className="max-w-[95%] mx-4 md:mt-20 mt-5">
          <CardHeader>
            <h2 className="text-2xl font-bold text-violet-700 underline capitalize">
              All useres Details
            </h2>
          </CardHeader>
          <CardContent className={`w-full`}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Avatar</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users && users?.users?.length > 0 ? (
                  users.users.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell
                        className={`w-[17%] whitespace-normal break-words`}
                      >
                        {item.role}
                      </TableCell>
                      <TableCell
                        className={`w-[17%] whitespace-normal break-words`}
                      >
                        {item.name}
                      </TableCell>
                      <TableCell
                        className={`w-[17%] whitespace-normal break-words`}
                      >
                        {item.email}
                      </TableCell>
                      <TableCell
                        className={`w-[17%]  whitespace-normal break-words`}
                      >
                        <img
                          src={item.avatar || userPng}
                          className="w-10 h-10 object-cover"
                        />
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
                          className={`cursor-pointer ml-3 ${
                            item.role === "admin"
                              ? "disabled:opacity-50 disabled:cursor-not-allowed"
                              : ""
                          }`}
                          variant="destructive"
                          onClick={() => handleDelete(item._id)}
                          disabled={item.role === "admin"}
                        >
                          <MdDeleteForever />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan="6"
                      className={`text-center pt-5 text-2xl font-bold `}
                    >
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

export default Users;
