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

const formSchema = z.object({
  department: z.string().min(1),
  position: z.string().min(1),
  phone: z.string().min(10).max(12).regex(/^\d+$/),
  profilePicture: z.string().url().optional(),
  facebookLink: z.string().url().optional(),
  twitterLink: z.string().url().optional(),
  linkedinLink: z.string().url().optional(),
});

type FormData = z.infer<typeof formSchema>;

const CoordinatorRoleDetailsPage: React.FC = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const handleSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    // Handle form submission logic (e.g., API call)
  };

  return (
    <main className="w-full flex flex-col items-center justify-center align-middle p-4 bg-gray-100">
      <div className="w-full max-w-md flex flex-col items-center gap-4 bg-white shadow-md rounded-lg p-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="w-full flex flex-col gap-4"
          >
            {/* Department */}
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Department"
                      type="text"
                      {...field}
                    />
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
                    <Input
                      placeholder="Position"
                      type="text"
                      {...field}
                    />
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
                    <Input
                      placeholder="Enter your phone number"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Profile Picture */}
            <FormField
              control={form.control}
              name="profilePicture"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Picture (URL)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Profile Picture URL"
                      type="text"
                      {...field}
                    />
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
                  name="facebookLink"
                  render={({ field }) => (
                    <FormControl>
                      <Input
                        placeholder="Facebook Link"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                  )}
                />
                <FormField
                  control={form.control}
                  name="twitterLink"
                  render={({ field }) => (
                    <FormControl>
                      <Input
                        placeholder="Twitter Link"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                  )}
                />
                <FormField
                  control={form.control}
                  name="linkedinLink"
                  render={({ field }) => (
                    <FormControl>
                      <Input
                        placeholder="LinkedIn Link"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                  )}
                />
              </div>
            </FormItem>

            {/* Update button */}
            <Button type="submit" className="w-full">
              Update Details
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default CoordinatorRoleDetailsPage;
