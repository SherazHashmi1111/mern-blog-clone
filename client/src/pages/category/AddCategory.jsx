import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
import { Link, useNavigate } from "react-router-dom";
import { RouteIndex, RouteSignup } from "@/helpers/RouteNames";
import { showToast } from "@/helpers/showToast";
import { getEnv } from "@/helpers/getEnv";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/authSlice";
import slugify from "slugify";

const formSchema = z.object({
  name: z.string().min(4, "Category must be 4 characters long"),
  slug: z.string(),
});

function AddCategory() {
  const navigate = useNavigate();
  // initialize form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  //   use slugify pkj
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

  // 2. Define a submit handler.
  async function onSubmit(data) {
    try {
      const res = await fetch(`${getEnv("VITE_API_BASE_URL")}/category/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await res.json();

      // handle HTTP errors (non-2xx)
      if (!res.ok) {
        showToast("error", resData?.message || "Something went wrong!");
        return;
      }

      showToast("success", "Category added successfully!");
      form.reset();
    } catch (error) {
      showToast(
        "error",
        error?.message || "Something went wrong adding category"
      );
    }
  }

  return (
    <div className="w-full h-full flex  justify-center">
      <Card className={`w-[75%] h-[45%] shadow-2xl mt-20`}>
        <CardHeader>
          <CardTitle
            className={`w-full text-center text-3xl font-bold font-[Pacifico] text-red-500 `}
          >
            AddCategory{" "}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Enter Category" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Your Slug" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className={`w-[50%] rounded-full mt-4 mx-auto block`}
              >
                Add Category
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddCategory;
