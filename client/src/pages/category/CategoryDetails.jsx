import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getEnv } from "@/helpers/getEnv";
import Loading from "@/helpers/Loading";
import useFetch from "@/hooks/useFetch";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RouteAddCategory, RouteEditCategory } from "@/helpers/RouteNames";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { deleteData } from "@/helpers/handleDelete";
import { showToast } from "@/helpers/showToast";

function CategoryDetails() {
    const [refreshData, setRefreshData] = useState();
  
  const { data, error, loading } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/category/all`,
    { method: "GET", credentials: "include" },[refreshData]
  );

   const handleDelete = (id) => {
    const response = deleteData(
      `${getEnv("VITE_API_BASE_URL")}/category/delete/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    if (response) {
      setRefreshData(!refreshData);
      showToast("Success", "Data Deleted");
    } else {
      showToast("Error", "Data Not Deleted");
    }
  };

  if (loading) return <Loading />;

  return (
    <Card className="md:max-w-screen-md md:mx-auto mt-40 flex items-center justify-center">
      <CardHeader className="flex items-center justify-center">
        <Button className="cursor-pointer" asChild>
          <Link to={RouteAddCategory}>Add Category</Link>
        </Button>
      </CardHeader>
      <CardContent className={`w-full`}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead className="hidden md:table-cell">Slug</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data && data?.categories?.length > 0 ? (
              data.categories.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {item.slug}
                  </TableCell>
                  <TableCell>
                    <Button className="cursor-pointer" asChild>
                      <Link to={RouteEditCategory(item._id)}>
                        <FaRegEdit />
                      </Link>
                    </Button>
                    <Button
                      className="cursor-pointer ml-3"
                      variant="destructive"
                      onClick={() => handleDelete(item._id)} // ✅ remove quotes
                    >
                      <MdDeleteForever />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="3" className={`text-center h-30 text-3xl font-bold`}>
                  Data not found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default CategoryDetails;
