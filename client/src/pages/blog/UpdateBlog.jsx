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
import useFetch from "@/hooks/useFetch";
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

  // Fetch categories
  const { data } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/category/all`,
    {
      method: "GET",
      credentials: "include",
    },
    []
  );

  // Form schema
  const formSchema = z.object({
    category: z.string(),
    title: z.string().min(2, "Title must be 2 characters long").max(64),
    slug: z.string().min(2, "Slug must be 2 characters long").max(64),
    blogContent: z.string().min(2, "Blog content must be 2 characters long"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      slug: "",
      blogContent: "",
    },
  });

  // Fetch blog data
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetch(
          `${getEnv("VITE_API_BASE_URL")}/blog/blog/${blogid}`,
          { method: "GET", credentials: "include" }
        );

        const data = await response.json();

        if (data?.blog) {
          setFilePreview(data.blog.featuredImage);
          form.reset({
            title: data.blog.title,
            category: data.blog.category?._id || "",
            slug: data.blog.slug || "",
            blogContent: decode(data.blog.blogContent || ""),
          });
        }
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    fetchBlogData();
  }, [blogid, form]);

  // Auto slugify
  const blogTitle = form.watch("title");
  useEffect(() => {
    if (blogTitle) {
      const slug = slugify(blogTitle, { lower: true, strict: true });
      form.setValue("slug", slug);
    }
  }, [blogTitle]);

  // Submit handler
  async function onSubmit(values) {
    const data = { ...values, author: user.user.user.id };

    try {
      const formData = new FormData();
      if (file) formData.append("file", file);
      formData.append("data", JSON.stringify(data));

      const res = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/blog/edit/${blogid}`,
        {
          method: "PUT",
          credentials: "include",
          body: formData,
        }
      );

      const resData = await res.json();

      if (!res.ok || resData?.error) {
        showToast("error", resData?.message || "Something went wrong!");
        return;
      }

      form.reset();
      setFile();
      setFilePreview();

      navigate(RouteBlog);
      showToast("success", "Blog Edited successfully!");
    } catch (error) {
      showToast("error", error?.message || "Something went wrong!");
    }
  }

  // File selection
  const handleFileSelection = (files) => {
    const file = files[0];
    setFile(file);
    setFilePreview(URL.createObjectURL(file));
  };

  return (
    <Card className="max-w-screen mx-4 mt-24">
      <CardHeader className="text-4xl font-bold text-orange-500">
        Update Blog
      </CardHeader>
      <CardContent className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {data?.categories?.length > 0 ? (
                          data.categories.map((item) => (
                            <SelectItem key={item._id} value={item._id}>
                              {item.name}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="no-category">No category</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your Title Here..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Slug */}
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

            {/* Featured Image */}
            <div className="mb-3 inline-block">
              <span>Featured Image</span>
              <Dropzone onDrop={(acceptedFiles) => handleFileSelection(acceptedFiles)}>
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div className="flex items-center justify-center h-54 w-96 mb-4 border-4 overflow-hidden border-dashed cursor-pointer rounded">
                      {filePreview && <img src={filePreview} alt="" />}
                    </div>
                  </div>
                )}
              </Dropzone>
            </div>

            {/* Blog Content */}
            <FormField
              control={form.control}
              name="blogContent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blog Content</FormLabel>
                  <FormControl>
                    <Editor
                      value={field.value}
                      onChange={(val) => field.onChange(val)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full cursor-pointer">
              Update Blog
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default UpdateBlog;
