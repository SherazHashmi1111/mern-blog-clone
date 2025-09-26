import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { Textarea } from "@/components/ui/textarea";
import Dropzone from "react-dropzone";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { FaCameraRetro } from "react-icons/fa";
import { setUser } from "@/store/authSlice";

// FormSchema
const formSchema = z.object({
  name: z.string().min(3, "Name is too short"),
  email: z.string().email("Invalid email address"),
  password: z.string(),
  bio: z.string(),
});

function Profile() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // Profile picture handling
  const avatar = user?.user?.user.avatar;

  const profilePic = avatar || "https://github.com/shadcn.png";
  const [filePreview, setFilePreview] = useState();
  const [file, setFile] = useState();

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

  // ===============================
  // Submit Handler
  // ===============================
  async function onSubmit(data) {
    try {
      // Build FormData with file + form fields
      const formData = new FormData();
      if (file) formData.append("file", file);
      formData.append("data", JSON.stringify(data));

      const res = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/user/update-user/${
          user?.user?.user.id
        }`,
        {
          method: "PUT",
          credentials: "include",
          body: formData,
        }
      );

      const resData = await res.json();

      // Handle errors
      if (!res.ok || resData?.error) {
        showToast("error", resData?.message || "Something went wrong!");
        return;
      }

      // Update redux state
      dispatch(setUser({ user: resData.newUser }));
      showToast("success", "Profile updated successfully!");
    } catch (error) {
      showToast("error", error?.message || "Something went wrong!");
    }
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

  const dropzoneHandler = (files) => {
    const file = files[0];
    setFile(file);
    setFilePreview(URL.createObjectURL(file));
  };
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Card className={`w-[90%] min-h-[90%] my-10`}>
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
              <div className="flex items-center justify-center ">
                <Dropzone
                  onDrop={(acceptedFiles) => dropzoneHandler(acceptedFiles)}
                  className="cursor-pointer"
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Avatar className="w-30 h-30 relative group">
                          <AvatarImage
                            src={filePreview || profilePic}
                            className="w-25 h-25 rounded-full"
                          />
                          {/* Overlay Camera Icon */}
                          <div
                            className="absolute inset-0 z-50 rounded-full border-4 border-red-500 bg-black/30 
                  hidden group-hover:flex items-center justify-center cursor-pointer"
                          >
                            <FaCameraRetro className="w-10 h-10 text-red-500" />
                          </div>
                        </Avatar>
                      </div>
                    </section>
                  )}
                </Dropzone>
              </div>
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
