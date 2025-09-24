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
import { Link } from "react-router-dom";
import { RouteSignup } from "@/helpers/RouteNames";

const formSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, "Password should be 8 character long")
    .max(32, "Password is too long"),
});

function Login() {
  // initialize form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Card className={`w-75`}>
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
