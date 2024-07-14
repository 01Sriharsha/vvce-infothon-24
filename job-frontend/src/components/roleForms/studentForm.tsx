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
import { useAxios } from "@/hooks/useAxios";
import { toast } from "sonner";

// Define the schema for form validation
const formSchema = z.object({
  profilePhoto: z.string(), // Assuming this will be a URL/path to the file
  resume: z.string(), // Assuming this will be a URL/path to the file
  USN: z.string().min(3).max(20),
  course: z.string().min(1), // Consider renaming to 'branch' for consistency
  graduationYear: z.string(), // Change to match model type
  current_year: z.number(), // Change to match model type
  address: z.string().optional(), // Make optional to match model
  phone: z
    .string()
    .min(10)
    .max(15)
    .regex(/^\d+$/, "Must be a valid phone number")
    .optional(), // Make optional to match model
  about: z.string().optional(), // Make optional to match model
  gradeCGPA: z.number().min(0).max(10).optional(), // Change to Float to match model
  socialMedia: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const StudentRoleDetailsForm = ({ id, role }: { id: number; role: string }) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      USN: "",
      course: "",
      graduationYear: "2023",
      current_year: 1,
      gradeCGPA: 0,
      address: "",
      phone: "",
      about: "",
      socialMedia: "",
    },
  });

  const { mutate, loading } = useAxios();

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        if (fileReader.result) {
          form.setValue("resume", fileReader.result.toString());
        }
      };

      fileReader.readAsDataURL(selectedFile);
    }
  };
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        if (fileReader.result) {
          form.setValue("profilePhoto", fileReader.result.toString());
        }
      };

      fileReader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit: SubmitHandler<FormData> = async (values) => {
    console.log(values);

    const student = {
      // Use the passed id prop
      USN: values.USN,
      branch: values.course,
      graduationYear: parseInt(values.graduationYear),
      current_year: values.current_year,
      address: values.address,
      phone: values.phone,
      picture: values.profilePhoto,
      resume: values.resume,
      about: values.about,
      social_links: values.socialMedia,
    };

    const { error, data } = await mutate("post", "/user/update", {
      student,
      userId: id,
      role
    });
    if (error) {
      toast.error(error);
    } else if (data) {
      console.log(data);
    }
  };

  const courses = [
    "Computer Science",
    "Electronics and Communication",
    "Information Technology",
    "Bio Technology",
    "Mechanical Engineering",
    "Civil Engineering",
  ];
  const years = ["2022", "2023", "2024", "2025", "2026", "2027"];

  return (
    <main className="mt-10 w-[60ch] flex flex-col items-center justify-center p-4 bg-teal-100 rounded-md">
      <div className="w-full max-w-md flex flex-col items-center gap-4 bg-pink rounded-lg p-6">
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
                      onChange={handleProfileChange}
                      className="rounded-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Resume upload */}
            <FormItem>
              <FormLabel>Upload Resume</FormLabel>
              <Input
                type="file"
                onChange={handleResumeChange}
                className="rounded-full"
              />
              <FormMessage />
            </FormItem>

            {/* Unique College ID */}
            <FormField
              name="USN"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unique College ID</FormLabel>
                  <Input type="text" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Course and Graduation Year in one row */}
            <div className="flex flex-col md:flex-row md:space-x-4">
              {/* Course */}
              <FormField
                name="course"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Course</FormLabel>
                    <select {...field} className="input">
                      <option value="">Select course</option>
                      {courses.map((courseOption) => (
                        <option key={courseOption} value={courseOption}>
                          {courseOption}
                        </option>
                      ))}
                    </select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Graduation Year */}
              <FormField
                name="graduationYear"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Graduation Year</FormLabel>
                    <select {...field} className="input">
                      <option value="">Select graduation year</option>
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Current Year */}
            <FormField
              name="current_year"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Year</FormLabel>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) =>
                      form.setValue("current_year", parseInt(e.target.value))
                    }
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Address */}
            <FormField
              name="address"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <Input type="text" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <Input type="text" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* About */}
            <FormField
              name="about"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>About</FormLabel>
                  <Input type="text" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Grade/CGPA */}
            <FormField
              name="gradeCGPA"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grade/CGPA</FormLabel>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) =>
                      form.setValue("gradeCGPA", parseInt(e.target.value))
                    }
                  />
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
                  name="socialMedia"
                  render={({ field }) => (
                    <FormControl>
                      <Input placeholder="add link" {...field} />
                    </FormControl>
                  )}
                />
              </div>
            </FormItem>

            {/* Submit button */}
            <Button type="submit" className="hover:bg-green-800">
              Save Details
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default StudentRoleDetailsForm;
