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
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { createFormSubmission } from "@/lib/actions/application.actions";

const ApplicationsPage = () => {
  const { user } = useUser();
  const { toast } = useToast();

  const formSchema = z.object({
    stageName: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    tagline: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stageName: "",
      tagline: "",
    },
  });

  // function onSubmit(values: z.infer<typeof formSchema>) {
  //   // Do something with the form values.
  //   // ✅ This will be type-safe and validated.
  //   console.log(values);
  // }

  function onSubmit(data: z.infer<typeof formSchema>) {
    // const formData = JSON.stringify(data);
    // const fullFormData = JSON.parse('{"stageName":${data.stageName}}');
    // console.log("FORMDATA", { fullFormData });

    const formData2 = {
      stageName: data.stageName,
      tagline: data.tagline,
      user: user?.primaryEmailAddress?.emailAddress,
    };

    console.log(formData2);
    // console.log("DATA", { data });

    // const stageName = data.stageName;
    // const tagline = data.tagline;

    createFormSubmission(formData2);

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
    <div className="flex justify-center  border-black border-2  m-12 mt-12 lg:mx-48 shadow-[8px_8px_0_0_#FE3D02]">
      <div className="flex flex-col gap-2 items-start m-4 md:mx-48 mt-12">
        <h1 className="text-xl font-bold">Welcome {user?.fullName},</h1>
        <p>
          Please fill out the form below. Your progress will be saved, so you
          can edit the information before submitting
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-6"
          >
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
        <div className="mt-6 justify-end flex w-full"></div>
      </div>
    </div>
  );
};

export default ApplicationsPage;