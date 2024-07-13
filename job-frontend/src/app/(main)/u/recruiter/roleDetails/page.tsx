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
  companyName: z.string().min(1),
  companyAddress: z.string().min(1),
  industrySector: z.string().min(1),
  websiteLink: z.string().url(),
});

type FormData = z.infer<typeof formSchema>;

const industrySectors = [
  "Technology",
  "Healthcare",
  "Finance",
  "Retail",
  "Education",
  "Automotive",
];

const RecruiterRoleDetailsPage: React.FC = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const handleSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    // Handle form submission logic (e.g., API call)
  };

  return (
    <main className="w-full flex flex-col items-center justify-center align-middle">
      <div className="w-full max-w-md flex flex-col items-center gap-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="w-full flex flex-col gap-4"
          >
            {/* Company Name */}
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Company Inc." type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Company Address */}
            <FormField
              control={form.control}
              name="companyAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="123 Street, City, Country"
                      type="text"
                      {...field}
                    />
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
                  <FormControl className="ml-8">
                    <select {...field} className="input">
                      {industrySectors.map((sector) => (
                        <option key={sector} value={sector}>
                          {sector}
                        </option>
                      ))}
                    </select>
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
                    <Input
                      placeholder="https://www.example.com"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

export default RecruiterRoleDetailsPage;
