import React, { useEffect, useState } from "react";
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
import { FaComments } from "react-icons/fa6";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import { showToast } from "@/helpers/showToast";
import { getEnv } from "@/helpers/getEnv";
import { Link } from "react-router-dom";
import { RouteLogin } from "@/helpers/RouteNames";
import CommentsList from "./CommentsList";

function Comment({ blogid }) {
  const user = useSelector((state) => state.user);
  
  let userid = null;
  if (user && user?.isLoggedIn) {
    userid = user.user.user.id;
  }
  

  const [newComment, setNewComment] = useState();

  // Form Schema
  const formSchema = z.object({
    comment: z.string().min(2, "Must not be empty"),
  });

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values) {
    // remove confirmPassword before sending to backend
    const updatedValues = { ...values, blogid, userid };

    try {
      const res = await fetch(`${getEnv("VITE_API_BASE_URL")}/comment/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedValues),
      });
      const resData = await res.json();
      setNewComment(resData.comment);
      // handle HTTP errors (non-2xx)
      if (!res.ok) {
        showToast("error", resData?.message || "Something went wrong!");
        return;
      }
      // success
      form.reset();
      showToast("success", "Comment Submitted!");
    } catch (error) {
      showToast("error", error?.message || "Something went wrong!");
    }
  }

  return (
    <>
      <div className="mt-5 border-t flex items-center gap-2 py-2 text-2xl font-bold">
        <FaComments className="text-violet-700" /> Comments
      </div>

      {user && user?.isLoggedIn ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="mb-3">
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comment</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Type your comment here..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="cursor-pointer">
              Add Comment
            </Button>
            <div className="border rounded-xl py-4 px-2">
              <CommentsList blogid={blogid} newComment={newComment} />
            </div>
          </form>
        </Form>
      ) : (
        <Button asChild variant={"ghost"}>
          <Link to={RouteLogin}>Plz login to see comments</Link>
        </Button>
      )}
    </>
  );
}

export default Comment;
