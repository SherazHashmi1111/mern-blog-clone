import React, { useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast";
import slugify from "slugify";
import useFetch from "@/hooks/useFetch";
import Loading from "@/helpers/Loading";

function EditCategory() {
  const { categoryid } = useParams();

  const options = useMemo(
    () => ({ method: "GET", credentials: "include" }),
    []
  );
  const { data, error, loading } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/category/details/${categoryid}`,
    options
  );

  const formSchema = z.object({
    name: z
      .string()
      .min(2, "Name must be 2 characters long")
      .max(32, "Name too long"),
    slug: z.string(),
  });

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  const categoryName = form.watch("name");
  useEffect(() => {
    if (categoryName) {
      const slug = slugify(categoryName, {
        lower: true,
        strict: true,
      });
      form.setValue("slug", slug);
    }
  }, [categoryName]);

  useEffect(() => {
    if (data?.category) {
      form.setValue("name", data.category.name || "");
      form.setValue("slug", data.category.slug || "");
    }
  }, [data, form]);

  // 2. Define a submit handler.
  async function onSubmit(values) {
    // remove confirmPassword before sending to backend
    try {
      const res = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/category/update/${categoryid}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );
      const resData = await res.json();
      // handle API-side errors
      if (resData?.error) {
        showToast("error", resData?.message || "Something went wrong!");
        return;
      }
      // handle HTTP errors (non-2xx)
      if (!res.ok) {
        showToast("error", resData?.message || "Something went wrong!");
        return;
      }
      // success
      showToast("success", "Category updated Successfully!");
    } catch (error) {
      showToast("error", error?.message || "Something went wrong!");
    }
  }

  if(loading) return <Loading/>
  return (
    <Card className={"max-w-screen-md mx-auto mt-50"}>
      <CardHeader className={"text-center text-4xl font-bold text-orange-500"}>
        Update Category
      </CardHeader>
      <CardContent className={"w-full"}>
        <div className="">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Your Name Here..."
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
              <Button type="submit" className="w-full cursor-pointer">
                Update Category
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
}

export default EditCategory;