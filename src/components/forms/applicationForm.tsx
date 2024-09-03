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
import React, { useEffect, useRef, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { useParams } from "next/navigation";
import {
  getFormSubmissionById,
  updateFormSubmission,
} from "@/lib/actions/application.actions";

import { Autosave, useAutosave } from "react-autosave";
import { applicationFormSchema } from "@/lib/validator";
import { FileUploader } from "../shared/FileUploader";
import { useUploadThing } from "@/lib/uploadthing";
import { handleError } from "@/lib/utils";

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
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedImage, setUploadedImage] = useState("");

  const { startUpload } = useUploadThing("imageUploader", {
    onUploadError: (error: Error) => {
      // alert(`ERROR! ${error.message}`);
      toast({
        title: "Error:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">File could not upload</code>
            <br />
            <code className="text-white">{error.message}</code>
            <br />
            <code className="text-white">File Must be less than 4MB</code>
          </pre>
        ),
      });
    },
    onUploadBegin: () => {
      // alert("upload has begun");
      toast({
        title: "",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">Upload has begun</code>
          </pre>
        ),
      });
    },
  });

  const applicationId = params.applicationId as string;

  const form = useForm<z.infer<typeof applicationFormSchema>>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: prefilledData,
  });

  //   function onSubmit(values: z.infer<typeof formSchema>) {
  //     // Do something with the form values.
  //     // ✅ This will be type-safe and validated.
  //     console.log(values);
  //   }

  // // == My AutoSave function using form.watch
  const values = form.getValues();

  const watch = form.watch();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const formData = {
        stageName: values.stageName,
        tagline: values.tagline,
        user: user?.primaryEmailAddress?.emailAddress,
        applicantResponse: values,
        applicationSubmitted: true,
      };
      updateFormSubmission(applicationId, formData);
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [watch]);

  const handleUpload = async (imageUrl: any) => {
    imageUrl.preventDefault();
    let uploadedImageUrl = imageUrl;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) return;

      console.log("uploaded image", uploadedImages);

      uploadedImageUrl = uploadedImages[0].url;
      // updateFormSubmission(applicationId);

      console.log("uploaded image URL", uploadedImageUrl);
      setUploadedImage(uploadedImageUrl);

      toast({
        title: "Congratulations!",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            {/* <code className="text-white">{JSON.stringify(data, null, 2)}</code> */}
            <code className="text-white">Image uploaded successfully</code>
          </pre>
        ),
      });
    }
  };

  async function onSubmit(data: z.infer<typeof applicationFormSchema>) {
    // const formData = JSON.stringify(data);
    // const fullFormData = JSON.parse('{"stageName":${data.stageName}}');
    // console.log("FORMDATA", { fullFormData });

    // data.imageUrl = uploadedImage;

    // const { stageName, tagline, imageUrl } = data;
    // console.log("peee", data);
    const formData = {
      ...data,
    };

    const formData2 = { ...formData, imageUrl: uploadedImage }; // { x: 42, foo: "baz", y: 9 }

    console.log(applicationFormSchema.parse(formData2));

    // const applicantResponse = JSON.stringify(data, null, 2);

    // console.log("DATA", { data });

    // const stageName = data.stageName;
    // const tagline = data.tagline;

    await updateFormSubmission(applicationId, formData2);

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          {/* <code className="text-white">{JSON.stringify(data, null, 2)}</code> */}
          <code className="text-white">
            `Good Job!: ${JSON.stringify(formData, null, 2)}``
          </code>
        </pre>
      ),
    });
  }

  // function useAutoSave(data: z.infer<typeof formSchema>, delay = 1000) {
  //   useEffect(() => {
  //     const formData = {
  //       stageName: data.stageName,
  //       tagline: data.tagline,
  //       user: user?.primaryEmailAddress?.emailAddress,
  //     };
  //     setTimeout(() => {
  //       updateFormSubmission(applicationId, formData);

  //       toast({
  //         title: "You submitted the following values:",
  //         description: (
  //           <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
  //             <code className="text-white">
  //               {JSON.stringify(data, null, 2)}
  //             </code>
  //           </pre>
  //         ),
  //       });
  //     }, delay);
  //   }, []);
  // }

  // const other = form.
  // const saveFormData = (values) => updateFormSubmission(applicationId, values);

  // useAutosave({ data: values, onSave: saveFormData });

  // == AutoSave using useRef()
  // const delay = 1000;
  // const prevValues = useRef(values);

  // const hasDataChanged = prevValues.current !== values;

  // useEffect(() => {
  //   if (hasDataChanged) {
  //     prevValues.current = values;
  //   }
  //   const timeoutId = setTimeout(() => {
  //     updateFormSubmission(applicationId, values);
  //   }, delay);

  //   return () => {
  //     clearTimeout(timeoutId);
  //   };
  // }, [delay, hasDataChanged, values]);

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

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Photo</FormLabel>
                <FormControl>
                  <div className="border-black border rounded-md flex items-center justify-center">
                    <FileUploader
                      onFieldChange={field.onChange}
                      imageUrl={field.value}
                      setFiles={setFiles}
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  {files.length > 0 && (
                    <div>
                      <Button onClick={handleUpload}>Upload Image</Button>
                    </div>
                  )}
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
