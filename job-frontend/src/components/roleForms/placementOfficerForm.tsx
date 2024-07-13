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
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"; // Import Select components
import Image from "next/image";

const formSchema = z.object({
  department: z.string().min(1),
  position: z.string().min(1),
  phone: z.string().min(10).max(12).regex(/^\d+$/),
  profilePicture: z.instanceof(File).optional(),
  socialMedia: z
    .object({
      platform: z.string().min(1),
      link: z.string().url().optional(),
    })
    .optional(),
});

type FormData = z.infer<typeof formSchema>;

const CoordinatorRoleDetailsForm: React.FC = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const handleSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    // Handle form submission logic (e.g., API call)
  };

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center p-4 ">
      <div className="w-full h-[60ch] max-w-4xl bg-teal-100 shadow-md rounded-lg p-6 flex flex-col md:flex-row items-center gap-4">
      <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="w-full flex flex-col gap-4"
          >
            {/* Profile Picture Upload */}
            <FormField
              control={form.control}
              name="profilePicture"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Picture</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          field.onChange(e.target.files[0]);
                        }
                      }}
                      className="rounded-full" // Add this class for round styling
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Department */}
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <FormControl>
                    <Input placeholder="Department" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Position */}
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <FormControl>
                    <Input placeholder="Position" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Social Media Links */}
            <FormItem>
              <FormLabel>Social Media Links</FormLabel>
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="socialMedia.platform"
                  render={({ field }) => (
                    <FormControl>
                      <Select onValueChange={(value) => field.onChange(value)}>
                        <SelectTrigger>
                          <span>Select a platform</span>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="facebook">Facebook</SelectItem>
                          <SelectItem value="twitter">Twitter</SelectItem>
                          <SelectItem value="linkedin">LinkedIn</SelectItem>
                          {/* Add more platforms as needed */}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  )}
                />
                <FormField
                  control={form.control}
                  name="socialMedia.link"
                  render={({ field }) => (
                    <FormControl>
                      <Input placeholder="Link" {...field} />
                    </FormControl>
                  )}
                />
              </div>
            </FormItem>

            {/* Update button */}
            <Button type="submit" className="w-full hover:bg-green-800">
              Save Details
            </Button>
          </form>
        </Form>
        <div className="w-full h-full md:w-4/5 flex justify-center">
        <Image
            src="/images/roleForm.png"
            alt="Login Illustration"
            width={700}
            height={700}
            className="w-full max-w-xs rounded-lg h-full object-scale-down p-2"
          />
        </div>
      </div>
    </main>
  );
};

export default CoordinatorRoleDetailsForm;
