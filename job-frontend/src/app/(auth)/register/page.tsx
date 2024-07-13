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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAxios } from "@/hooks/useAxios";
import { useAppDispatch } from "@/store";
import { useRouter } from "next/navigation";
import { Response, User } from "@/types";
import { toast } from "sonner";
import { authenticate } from "@/store/features/authSlice";

const formSchema = z
  .object({
    username: z.string().min(4, "Username cannot be empty"),
    emailAddress: z
      .string()
      .min(1, "Email cannot be empty")
      .email("Invalid email"),
    password: z.string().min(5, "Password must contain atleast 5 characters"),
    passwordConfirm: z.string(),
    role: z.string().min(1, "Select role"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"], // The path to the field to attach the error message to
  });

type FormData = z.infer<typeof formSchema>;

const EditProfilePage: React.FC = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: "",
      password: "",
      role: "",
      passwordConfirm: "",
      username: "",
    },
  });

  const { mutate, loading } = useAxios();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    console.log(values);

    const { error, data } = await mutate<Response<User>>(
      "post",
      "/auth/register",
      {
        email: values.emailAddress,
        password: values.password,
        role: values.role,
        name: values.username,
      }
    );
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
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row items-center gap-4">
        {/* Form */}
        <div className="w-full md:w-1/2 flex flex-col items-center gap-4 pl-10">
          <h1 className="text-2xl font-semibold">Sign Up</h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-4"
            >
              {/* Role Confirm */}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="select role" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        <SelectItem value="STUDENT">Student</SelectItem>
                        <SelectItem value="RECRUITER">Recruiter</SelectItem>
                        <SelectItem value="COORDINATOR">Coordinator</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                    <FormLabel>Confirm Password</FormLabel>
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
