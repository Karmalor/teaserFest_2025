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
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { useParams } from "next/navigation";
import {
  getFormSubmissionById,
  updateFormSubmission,
} from "@/lib/actions/application.actions";

// type ApplicationFormProps = {
//   prefilledData:
//     | {
//         stageName: string | "";
//         tagline: string | "";
//       }
//     | undefined;
// };

const ApplicationForm = ({ prefilledData }: { prefilledData: {} }) => {
  const { user } = useUser();
  const { toast } = useToast();
  const params = useParams();
  //   const [prefilledData, setPrefilledData] = useState();

  const applicationId = params.applicationId as string;

  const formSchema = z.object({
    stageName: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    tagline: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: prefilledData,
  });

  //   function onSubmit(values: z.infer<typeof formSchema>) {
  //     // Do something with the form values.
  //     // ✅ This will be type-safe and validated.
  //     console.log(values);
  //   }

  function onSubmit(data: z.infer<typeof formSchema>) {
    // const formData = JSON.stringify(data);
    // const fullFormData = JSON.parse('{"stageName":${data.stageName}}');
    // console.log("FORMDATA", { fullFormData });

    const formData = {
      stageName: data.stageName,
      tagline: data.tagline,
      user: user?.primaryEmailAddress?.emailAddress,
    };

    console.log(formData);
    // console.log("DATA", { data });

    // const stageName = data.stageName;
    // const tagline = data.tagline;

    updateFormSubmission(applicationId, formData);

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-6">
          <FormField
            control={form.control}
            name="stageName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stage name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="enter name..."
                    {...field}
                    className="border border-black"
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tagline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tagline</FormLabel>
                <FormControl>
                  <Input
                    placeholder="enter tagline..."
                    {...field}
                    className="border border-black"
                  />
                </FormControl>
                <FormDescription>
                  This is how you would like to be introduced on stage
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField
              control={form.control}
              name="music"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Music</FormLabel>
                  <br />
                  <FormControl>
                    <Button type="button">Upload a music file</Button>
                  </FormControl>
                  <FormDescription>
                    Select a file from your device
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default ApplicationForm;
