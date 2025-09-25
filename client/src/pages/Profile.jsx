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
import { RouteLogin, RouteSignup } from "@/helpers/RouteNames";
import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast";
import { useSelector } from "react-redux";
import { Textarea } from "@/components/ui/textarea";

// FormSchema
const formSchema = z
  .object({
    name: z.string().min(3, "Name is too short"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password should be 8 characters long")
      .max(32, "Password is too long"),
    bio: z.string(),
  })
  .refine((data) => data.password === data.retypepassword, {
    message: "Passwords do not match",
    path: ["retypepassword"], // 🔑 error will show under retypepassword field
  });

function Profile() {
  const user = useSelector((state) => state.user);
  console.log(user);

  // initialize form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values) {
    const { retypepassword, ...data } = values;
    // Sending data logic will go here
  }

  // ===============================
  // Prefill form when user data is fetched
  // ===============================
  useEffect(() => {
    if (user && user?.isLoggedIn) {
      form.reset({
        name: user.user.user.name || "",
        email: user.user.user.email || "",
        bio: user.user.user.bio || "",
      });
    }
  }, [user, form]);
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Card className={`w-[90%] h-[90%]`}>
        <CardHeader>
          <CardTitle
            className={`w-full text-center text-3xl font-bold font-[Pacifico] text-red-500 `}
          >
            Update Profile{" "}
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
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Your Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Your Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Type your message here."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Crate Your Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className={`w-full rounded-full mt-4`}>
                Update Profile
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Profile;
