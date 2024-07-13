"use client";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const JobSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  type: z.string().min(1, { message: "Type is required" }),
  duration: z.string().min(1, { message: "Duration is required" }),
  package: z.string().min(1, { message: "Package is required" }),
  min_cgpa: z.string().min(1, { message: "Minimum CGPA is required" }),
});

type JobSchema = z.infer<typeof JobSchema>;

const CreateJobPage = () => {
  const form = useForm<JobSchema>({
    resolver: zodResolver(JobSchema),
    defaultValues: {
      description: "",
      duration: "",
      min_cgpa: "",
      package: "",
      title: "",
      type: "",
    },
  });

  const onSubmit = (values: JobSchema) => {};

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row items-center gap-4">
        {/* Form */}
        <div className="w-full md:w-1/2 flex flex-col items-center gap-4 pl-10">
          <h1 className="text-2xl font-semibold">Sign Up</h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 w-[400px] rounded-xl border border-gray-700 shadow-sm"
            >
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="select job type" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="enter job title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={6}
                        placeholder="enter job description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.getValues().type === "internship" && (
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Internship Duration</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="enter Internship Duration"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="package"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expectable CTC Range</FormLabel>
                    <FormControl>
                      <Input placeholder="enter range" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="min_cgpa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum CGPA</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="enter minimum CGPA"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default CreateJobPage;
