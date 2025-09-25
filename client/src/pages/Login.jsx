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
import { RouteIndex, RouteSignup } from "@/helpers/RouteNames";
import { showToast } from "@/helpers/showToast";
import { getEnv } from "@/helpers/getEnv";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/authSlice";

const formSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, "Password should be 8 character long")
    .max(32, "Password is too long"),
});

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // initialize form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(data) {
    try {
      const res = await fetch(`${getEnv("VITE_API_BASE_URL")}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await res.json();

      // handle HTTP errors (non-2xx)
      if (!res.ok) {
        showToast("error", resData?.message || "Something went wrong!");
        return;
      }

      dispatch(setUser(resData))
      showToast("success", "User loggedin successfully!");
      form.reset();
      navigate(RouteIndex);
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
            Login{" "}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                      <Input placeholder="Enter Your Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Link to={RouteSignup} className="text-blue-600 underline">
                Forgot Password?
              </Link>

              <Button type="submit" className={`w-full rounded-full mt-4`}>
                Submit
              </Button>
              <div className="felx gap-5">
                <span>Don't have an account?</span>
                <Link to={RouteSignup} className="text-blue-600 underline">
                  Signup
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
