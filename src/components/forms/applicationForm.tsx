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
import { useParams, useRouter } from "next/navigation";
import {
  getFormSubmissionById,
  updateFormSubmission,
} from "@/lib/actions/application.actions";

import { Autosave, useAutosave } from "react-autosave";
import {
  applicantResponseSchema,
  applicationFormSchema,
} from "@/lib/validator";
import { FileUploader } from "../shared/FileUploader";
import { useUploadThing } from "@/lib/uploadthing";
import { handleError } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";

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
  const [uploadedImage, setUploadedImage] = useState();
  const router = useRouter();

  useEffect(() => {
    const deata = JSON.parse(JSON.stringify(prefilledData));
    setUploadedImage(deata.imageUrl);
  }, [prefilledData]);

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

  const form = useForm<z.infer<typeof applicantResponseSchema>>({
    resolver: zodResolver(applicantResponseSchema.partial()),
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
        applicantResponse: {
          ...values,
          imageUrl: uploadedImage,
        },
      };

      updateFormSubmission(applicationId, formData);
    }, 1000);

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

      console.log("doobie", uploadedImage);

      const formData = {
        ...values,
        applicantResponse: {
          ...values,
          imageUrl: uploadedImage,
        },
      };

      updateFormSubmission(applicationId, formData);

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

  // async function handleSubmitForm(
  //   data: z.infer<typeof applicantResponseSchema>
  // ) {
  //   console.log("congrations!");
  // }

  async function onSubmit(data: z.infer<typeof applicantResponseSchema>) {
    console.log("congrations!");

    const formData = {
      ...data,
      applicationSubmitted: true,
      submittedAt: new Date().toISOString().toLocaleString(),
      // applicantResponse: {
      //   ...data,
      imageUrl: uploadedImage,
      // },
    };

    await updateFormSubmission(applicationId, formData);

    await fetch("/api/email", {
      method: "POST",
      body: JSON.stringify({
        firstName: data.stageName,
        email: user?.primaryEmailAddress?.emailAddress,
      }),
    });

    toast({
      title: "You submitted your application!",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          {/* <code className="text-white">{JSON.stringify(data, null, 2)}</code> */}
          <code className="text-white">
            `${JSON.stringify(formData, null, 2)}
          </code>
        </pre>
      ),
    });

    router.push("/applicantDashboard");
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
                    placeholder="enter stage name..."
                    {...field}
                    className="border border-black"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="legalName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Legal name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="enter legal name..."
                    {...field}
                    className="border border-black"
                  />
                </FormControl>

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
            name="preferredPronouns"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Pronouns</FormLabel>
                <FormControl>
                  <Input
                    placeholder="enter pronouns..."
                    {...field}
                    className="border border-black"
                  />
                </FormControl>
                <FormDescription>optional</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nameOfAct"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name of your Act</FormLabel>
                <FormControl>
                  <Input
                    placeholder="enter act name..."
                    {...field}
                    className="border border-black"
                  />
                </FormControl>
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

          <FormField
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
          />

          <FormField
            control={form.control}
            name="performanceVideo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link to Video Performance</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ex: www.youtube.com..."
                    {...field}
                    className="border border-black"
                  />
                </FormControl>
                <FormDescription>
                  Share an example of your performance
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="techNotes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>List any Tech Notes</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="enter tech notes..."
                    {...field}
                    className="border border-black"
                  />
                </FormControl>
                <FormDescription>optional</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lightingRequests"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Any lighting requests</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="enter tech notes..."
                    {...field}
                    className="border border-black"
                  />
                </FormControl>
                <FormDescription>optional</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="soundCues"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Any sound cues</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="enter tech notes..."
                    {...field}
                    className="border border-black"
                  />
                </FormControl>
                <FormDescription>optional</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="setupForAct"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Setup details for act</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="enter tech notes..."
                    {...field}
                    className="border border-black"
                  />
                </FormControl>
                <FormDescription>optional</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="breakdownForAct"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Breakdown detials for act</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="enter tech notes..."
                    {...field}
                    className="border border-black"
                  />
                </FormControl>
                <FormDescription>optional</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="socialMediaLinks"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Any social media accounts?</FormLabel>
                <FormControl>
                  <div className="flex flex-col">
                    <FormField
                      control={form.control}
                      name="socialMediaLinks.instagram"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel></FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Instagram @..."
                              {...field}
                              className="border border-black"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="socialMediaLinks.faceBook"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel></FormLabel>
                          <FormControl>
                            <Input
                              placeholder="FaceBook username..."
                              {...field}
                              className="border border-black"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="socialMediaLinks.tikTok"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel></FormLabel>
                          <FormControl>
                            <Input
                              placeholder="tikTok username..."
                              {...field}
                              className="border border-black"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="submitToCompetition"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Would you like to submit this act for competition in the
                  "Queen of the Striptease" Competition?
                </FormLabel>
                <br />
                <FormControl>
                  {/* <Textarea
                    placeholder="enter tech notes..."
                    {...field}
                    className="border border-black"
                  /> */}
                  <Checkbox
                    onCheckedChange={field.onChange}
                    checked={field.value}
                    id="submitToCompetition"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            // onClick={handleSubmitForm}
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ApplicationForm;
