import React from "react";
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

const formSchema = z
  .object({
    name: z.string().min(3, "Name is too short"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password should be 8 characters long")
      .max(32, "Password is too long"),
    retypepassword: z.string(),
  })
  .refine((data) => data.password === data.retypepassword, {
    message: "Passwords do not match",
    path: ["retypepassword"], // 🔑 error will show under retypepassword field
  });

function Signup() {
  const navigate = useNavigate();
  // initialize form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      retypepassword: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values) {
    const { retypepassword, ...data } = values;
    // Sending data logic will go here
    try {
      const res = await fetch(`${getEnv("VITE_API_BASE_URL")}/auth/register`, {
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

      showToast("success", "User registered successfully! Please Login");
      form.reset();
      navigate(RouteLogin);
    } catch (error) {
      showToast(
        "error",
        error?.message || "Something went wrong in register user"
      );
    }
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Card className={`md:w-100 shadow-2xl`}>
        <CardHeader>
          <CardTitle
            className={`w-full text-center text-3xl font-bold font-[Pacifico] text-red-500 `}
          >
            Signup{" "}
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
              <FormField
                control={form.control}
                name="retypepassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Retype Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Retype Your Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className={`w-full rounded-full mt-4`}>
                Submit
              </Button>
              <div className="felx gap-5 ">
                <span>Have an account?</span>
                <Link to={RouteLogin} className="text-blue-600 underline">
                  Login
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Signup;
