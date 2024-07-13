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

const formSchema = z.object({
  username: z.string().min(4),
  emailAddress: z.string().email(),
  password: z.string().min(3),
  rememberMe: z.boolean().optional(),
  passwordConfirm: z.string(),
});

type FormData = z.infer<typeof formSchema>;

const EditProfilePage: React.FC = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: "",
      rememberMe: false,
    },
  });

  const handleSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <div className="w-full h-[50ch] max-w-4xl bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row items-center gap-4">
        {/* Form */}
        <div className="w-full md:w-1/2 flex flex-col items-center gap-4 pl-10">
          <h1 className="text-2xl font-semibold">Sign Up</h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="w-full flex flex-col gap-4"
            >
            {/* Username */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="xyz1" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
              {/* Email */}
              <FormField
                control={form.control}
                name="emailAddress"
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

              {/* Password Confirm */}
            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password Confirm</FormLabel>
                  <FormControl>
                    <Input placeholder="********" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

              {/*SignUp button */}
              <Button
                type="submit"
                className="w-full hover:bg-green-700 text-white py-2 rounded-lg"
              >
                SignUp
              </Button>
            </form>
          </Form>
        </div>
         {/* Image */}
         <div className="w-full h-full md:w-4/5 flex justify-center">
        <Image
            src="/images/register.jpg"
            alt="Login Illustration"
            width={700}
            height={700}
            className="w-full max-w-xs rounded-lg h-full object-fill p-2"
          />
        </div>
      </div>
    </main>
  );
};

export default EditProfilePage;
