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
import { useState } from "react";

const formSchema = z.object({
  institutionName: z.string().min(1),
  uniqueCollegeID: z.string().min(3).max(20),
  course: z.string().min(1),
  graduationYear: z.string().min(4),
  gradeCGPA: z.string().min(1).max(10),
  githubLink: z.string().url().optional(),
  linkedinLink: z.string().url().optional(),
});

type FormData = z.infer<typeof formSchema>;

const StudentRoleDetailsPage: React.FC = () => {
  const [resume, setResume] = useState<File | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      institutionName: "",
      uniqueCollegeID: "",
      course: "",
      graduationYear: "",
      gradeCGPA: "",
      githubLink: "",
      linkedinLink: "",
    },
  });

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  const handleSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    if (resume) {
      // Handle file upload logic here
      console.log("Resume file:", resume);
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
    <main className="w-full flex flex-col items-center justify-center">
      <div className="w-full max-w-md flex flex-col items-center gap-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="w-full flex flex-col gap-4"
          >
            {/* Resume upload */}
            <FormItem>
              <FormLabel>Upload Resume</FormLabel>
              <Input type="file" onChange={handleResumeChange} />
            </FormItem>

            {/* InstitutionName */}
            <FormField
              control={form.control}
              name="institutionName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Institution Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ABCD University"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

           {/* Unique College ID */}
        <FormField
          name="uniqueCollegeID"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unique College ID</FormLabel>
              <Input type="text" {...field} />
              <FormMessage/>
            </FormItem>
          )}
        />

 {/* Course and Graduation Year in one row */}
 <div className="flex space-x-4">
          {/* Course */}
          <FormField
            name="course"
            control={form.control}
            render={({ field }: { field: unknown }) => (
              <FormItem className="flex-1">
                <FormLabel>Course</FormLabel>
                <select {...(field as any)} className="input">
                  <option value="">Select course</option>
                  {courses.map((courseOption) => (
                    <option key={courseOption} value={courseOption}>
                      {courseOption}
                    </option>
                  ))}
                </select>
                <FormMessage/>
              </FormItem>
            )}
          />

          {/* Graduation Year */}
          <FormField
            name="graduationYear"
            control={form.control}
            render={({ field }: { field: unknown }) => (
              <FormItem className="flex-1">
                <FormLabel>Graduation Year</FormLabel>
                <select {...(field as any)} className="input">
                  <option value="">Select graduation year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <FormMessage/>
              </FormItem>
            )}
          />
        </div>

        {/* Grade/CGPA */}
        <FormField
          name="gradeCGPA"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Grade/CGPA</FormLabel>
              <Input type="text" {...field} />
              <FormMessage/>
            </FormItem>
          )}
        />

        {/* GitHub and LinkedIn links in one row */}
        <div className="flex space-x-4">
          {/* GitHub Link */}
          <FormField
            name="githubLink"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>GitHub Link</FormLabel>
                <Input type="text" {...field} />
                <FormMessage/>
              </FormItem>
            )}
          />

          {/* LinkedIn Link */}
          <FormField
            name="linkedinLink"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>LinkedIn Link</FormLabel>
                <Input type="text" {...field} />
                <FormMessage/>
              </FormItem>
            )}
          />
        </div>

        {/* Submit button */}
        <Button type="submit">Save Details</Button>
        </form>
      </Form>
      </div>
    </main>
  );
};

export default StudentRoleDetailsPage;
