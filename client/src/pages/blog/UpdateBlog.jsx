import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast";
import slugify from "slugify";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import  useFetch  from "@/hooks/useFetch";
import Dropzone from "react-dropzone";
import Editor from "@/components/ui/Editor";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { decode } from "entities";
import { RouteBlog } from "@/helpers/RouteNames.js";

function UpdateBlog() {
  const params = useParams();
  const [filePreview, setFilePreview] = useState();
  const [file, setFile] = useState();
  const user = useSelector((state) => state.user);
  
  const navigate = useNavigate();
  const blogid = params.blogid;

  // Data fetched for getting categories names
  const { data, error, loading } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/category/all`,
    {
      method: "GET",
      credentials: "include",
    },
    []
  );

  // Form logic
  const formSchema = z.object({
    category: z.string(),
    title: z
      .string()
      .min(2, "Title must be 2 characters long")
      .max(64, "Title too long"),
    slug: z
      .string()
      .min(2, "Slug must be 2 characters long")
      .max(64, "Slug too long"),
    blogContent: z.string().min(2, "BlogContent must be 2 characters long"),
  });

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      slug: "",
      blogContent: "",
    },
  });

  // Blog data fetched from DB
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetch(
          `${getEnv("VITE_API_BASE_URL")}/blog/blog/${blogid}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await response.json();

        if (data?.blog) {
          setFilePreview(data.blog.featuredImage);
          form.setValue("title", data.blog.title); // assuming title exists
          form.setValue("category", data.blog.category?._id || "");
          form.setValue("slug", data.blog.slug || "");
          form.setValue("blogContent", decode(data.blog.blogContent || ""));
        }
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    fetchBlogData();
  }, [blogid, form]);

  //Handle Editor data
  const handleEditorData = (event, editor) => {
    const data = editor.getData();
    form.setValue("blogContent", data);
  };

  //   use slugify pkj
  const blogTitle = form.watch("title");
  useEffect(() => {
    if (blogTitle) {
      const slug = slugify(blogTitle, {
        lower: true,
        strict: true,
      });
      form.setValue("slug", slug);
    }
  }, [blogTitle]);

  // 2. Define a submit handler.
  async function onSubmit(values) {
    const data = { ...values, author: user.user.user.id };

    try {
      // Build FormData with file + form fields
      const formData = new FormData();
      if (file) formData.append("file", file);
      formData.append("data", JSON.stringify(data));

      const res = await fetch(`${getEnv("VITE_API_BASE_URL")}/blog/edit/${blogid}`, {
        method: "PUT",
        credentials: "include",
        body: formData,
      });

      const resData = await res.json();

      // Handle errors
      if (!res.ok || resData?.error) {
        showToast("error", resData?.message || "Something went wrong!");
        return;
      }

      // rest files
      form.reset();
      setFile();
      setFilePreview();

      // Update redux state
      //  dispatch(setUser({ user: resData.newUser }));
      navigate(RouteBlog);
      showToast("success", "Blog Edited successfully!");
    } catch (error) {
      showToast("error", error?.message || "Something went wrong!");
    }
  }

  // ===============================
  // File Dropzone handler
  // ===============================
  const handleFileSelection = (files) => {
    const file = files[0];
    setFile(file);
    setFilePreview(URL.createObjectURL(file));
  };

  return (
    <Card className={"max-w-screen mx-4 mt-24"}>
      <CardHeader className={"text-4xl font-bold text-orange-500"}>
        Update Blog
      </CardHeader>
      <CardContent className={"w-full"}>
        <div className="">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value} // <-- use value instead of defaultValue
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>

                          <SelectContent>
                            {data &&
                            data.categories &&
                            data.categories.length > 0 ? (
                              data.categories.map((item) => (
                                <SelectItem key={item._id} value={item._id}>
                                  {item.name}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem value="no-category">
                                No category
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Your Title Here..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input placeholder="Slug" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3 inline-block">
                <span>Featured Image</span>
                <Dropzone
                  onDrop={(acceptedFiles) => handleFileSelection(acceptedFiles)}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <div className="flex items-center justify-center h-54 w-96 mb-4 border-4 overflow-hidden border-dashed cursor-pointer rounded">
                        <img src={filePreview} alt="" />
                      </div>
                    </div>
                  )}
                </Dropzone>
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="blogContent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bolg Content</FormLabel>
                      <FormControl>
                        <div className="mb-3 w-[99%]">
                          <Editor
                            key={field.value} // key forces remount when content changes
                            initialData={field.value}
                            onChange={handleEditorData}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full cursor-pointer">
                Update Blog
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
}

export default UpdateBlog;