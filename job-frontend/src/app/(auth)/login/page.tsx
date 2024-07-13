"use client";

import * as z from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useAxios } from "@/hooks/useAxios";
import { Response, User } from "@/types";
import { toast } from "sonner";
import { useAppDispatch } from "@/store";
import { authenticate } from "@/store/features/authSlice";
import { useRouter } from "next/navigation";
import { LoaderIcon } from "lucide-react";
import axios from "@/lib/axios";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  rememberMe: z.boolean().optional(),
});

type FormData = z.infer<typeof formSchema>;

const EditProfilePage: React.FC = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, loading } = useAxios();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit: SubmitHandler<FormData> = async (values) => {
    const { error, data } = await mutate<Response<User>>(
      "post",
      "/auth/login",
      values
    );
    console.log(data, error);
    if (error) {
      toast.error(error);
      return;
    } else if (data) {
      dispatch(authenticate(data.data));
      toast.success(data.message);
      router.replace("/");
    }
  };

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <div className="w-full h-[50ch] max-w-4xl bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row items-center gap-4">
        {/* Image */}
        <div className="w-full md:w-4/5 flex justify-center">
          <Image
            src="/images/login.jpg"
            alt="Login Illustration"
            width={700}
            height={700}
            className="w-full max-w-xs rounded-lg"
          />
        </div>
        {/* Form */}
        <div className="w-full md:w-1/2 flex flex-col items-center gap-4 pr-6">
          <h1 className="text-2xl font-semibold">Login</h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="w-full flex flex-col gap-4"
            >
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="abc@gmail.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="********"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Remember Me and Forgot Password */}
              <div className="flex justify-between items-center">
                <Link href="#" className="text-blue-500 hover:underline">
                  Forgot Password?
                </Link>
              </div>

              {/* Login button */}
              <Button
                type="submit"
                className="w-full hover:bg-green-700 text-white py-2 rounded-lg"
              >
                {loading ? <LoaderIcon className="animate-spin" /> : "Login"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default EditProfilePage;
