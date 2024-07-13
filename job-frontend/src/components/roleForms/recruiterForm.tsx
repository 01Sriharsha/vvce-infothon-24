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
} from "@/components/ui/select";

const formSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  description: z
    .string()
    .min(10, "Description should be at least 10 characters long"),
  position: z.string().min(1, "Position is required"),
  address: z.string().min(1, "Address is required"),
  phone: z.string().min(10).max(12).regex(/^\d+$/, "Phone must be numeric"),
  profilePhoto: z.instanceof(File).optional(),
  industrySector: z.string().min(1, "Industry sector is required"),
  websiteLink: z.string().url("Must be a valid URL").optional(),
  socialMedia: z
    .object({
      platform: z.string().min(1),
      link: z.string().url().optional(),
    })
    .optional(),
});

type FormData = z.infer<typeof formSchema>;

const RecruiterDetailsForm: React.FC = () => {
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
      <div className="w-full h-full max-w-4xl bg-teal-100 shadow-md rounded-lg p-6 flex flex-col md:flex-row items-center gap-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="w-full flex flex-col gap-4"
          >
            {/* Profile Photo Upload */}
            <FormField
              control={form.control}
              name="profilePhoto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Photo</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          field.onChange(e.target.files[0]);
                        }
                      }}
                      className="rounded-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Company Name */}
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Company Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Description" {...field} />
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

            {/* Address */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Address" {...field} />
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

            {/* Industry Sector */}
            <FormField
              control={form.control}
              name="industrySector"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industry Sector</FormLabel>
                  <FormControl>
                    <Input placeholder="Industry Sector" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Website Link */}
            <FormField
              control={form.control}
              name="websiteLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website Link</FormLabel>
                  <FormControl>
                    <Input placeholder="Website Link" {...field} />
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
              Update Details
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default RecruiterDetailsForm;
