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
import React, { Suspense, useEffect, useRef, useState } from "react";

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
import {
  UploadButton,
  UploadDropzone,
  useUploadThing,
} from "@/lib/uploadthing";
import { handleError } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { MusicUploader } from "../shared/MusicUploder";
import Link from "next/link";
import { LuMusic } from "react-icons/lu";
import { metadata } from "@/app/layout";

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
  const router = useRouter();
  const [musicUrl, setMusicUrl] = useState("");
  const [musicName, setMusicName] = useState("");
  // const [imageUrl, setImageUrl] = useState("")
  const [disabled, setDisabled] = useState();

  useEffect(() => {
    const deata = JSON.parse(JSON.stringify(prefilledData));
    setUploadedImage(deata.imageUrl);
    setMusicName(deata.musicName);
    setMusicUrl(deata.musicUrl);

    console.log(deata.applicationSubmitted);
    setDisabled(deata.applicationSubmitted);
    console.log("Disabled?", disabled);
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
            <code className="text-white">File Must be less than 16MB</code>
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
    mode: "onSubmit",
    resolver: zodResolver(applicantResponseSchema),
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
          musicUrl: musicUrl,
          musicName: musicName,
        },
      };

      updateFormSubmission(applicationId, formData);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [watch]);

  // const handleUpload = async (imageUrl: any) => {
  //   imageUrl.preventDefault();
  //   let uploadedImageUrl = imageUrl;

  //   if (files.length > 0) {
  //     const uploadedImages = await startUpload(files);

  //     if (!uploadedImages) return;

  //     console.log("uploaded image", uploadedImages);

  //     uploadedImageUrl = uploadedImages[0].url;
  //     // updateFormSubmission(applicationId);

  //     console.log("uploaded image URL", uploadedImageUrl);
  //     setUploadedImage(uploadedImageUrl);

  //     console.log("doobie", uploadedImage);

  //     const formData = {
  //       ...values,
  //       applicantResponse: {
  //         ...values,
  //         imageUrl: uploadedImage,
  //       },
  //     };

  //     updateFormSubmission(applicationId, formData);

  //     toast({
  //       title: "Congratulations!",
  //       description: (
  //         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
  //           <code className="text-white">Image uploaded successfully</code>
  //         </pre>
  //       ),
  //     });
  //   }
  // };

  // const handleMusicUpload = async (musicUrl: any) => {
  //   musicUrl.preventDefault();
  //   let uploadedMusicUrl = musicUrl;

  //   if (files.length > 0) {
  //     const uploadedImages = await startUpload(files);

  //     if (!uploadedImages) return;

  //     console.log("uploaded image", uploadedImages);

  //     uploadedMusicUrl = uploadedImages[0].url;
  //     // updateFormSubmission(applicationId);

  //     console.log("uploaded image URL", uploadedMusicUrl);
  //     // setUploadedImage(uploadedImageUrl);

  //     console.log("doobie", uploadedMusicUrl);

  //     const formData = {
  //       ...values,
  //       applicantResponse: {
  //         ...values,
  //         musicUrl: uploadedMusicUrl,
  //       },
  //     };

  //     updateFormSubmission(applicationId, formData);

  //     toast({
  //       title: "Congratulations!",
  //       description: (
  //         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
  //           {/* <code className="text-white">{JSON.stringify(data, null, 2)}</code> */}
  //           <code className="text-white">Music uploaded successfully</code>
  //         </pre>
  //       ),
  //     });
  //   }
  // };

  async function onSubmit(data: z.infer<typeof applicantResponseSchema>) {
    console.log("congrations!");

    const formData = {
      ...data,
      applicationSubmitted: true,
      submittedAt: new Date().toISOString().toLocaleString(),
      // applicantResponse: {
      //   ...data,
      imageUrl: uploadedImage,
      musicUrl: musicUrl,
      musicName: musicName,
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
      // description: (
      //   <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
      //     {/* <code className="text-white">{JSON.stringify(data, null, 2)}</code> */}
      //     {/* <code className="text-white">
      //       `${JSON.stringify(formData, null, 2)}
      //     </code> */}
      //   </pre>
      // ),
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
          <fieldset disabled={disabled}>
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
              name="descriptionOfAct"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description Of the Act</FormLabel>
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
              name="imageUrl"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Photo</FormLabel>
                  <FormControl>
                    <div className="">
                      {/* <FileUploader
                      onFieldChange={field.onChange}
                      imageUrl={field.value}
                      setFiles={setFiles}
                    /> */}
                      {uploadedImage ? (
                        <div
                          className="mt-2 flex flex-col items-center justify-center rounded-lg border border-black text-center h-[245px] px-6 py-2 ut-button:bg-black ut-label:text-black ut-ready:border-solid ut-ready:border-black ut-uploading:border-solid ut-uploading:border-black cursor-pointer
                      "
                        >
                          <div className="flex-center bg-dark-3 flex h-72 cursor-pointer flex-col overflow-hidden rounded-md bg-grey-50 items-center justify-center">
                            <Suspense fallback={<h1>Loading Image...</h1>}>
                              <a
                                target="_blank"
                                href={uploadedImage}
                                rel="noopener noreferrer"
                              >
                                <img
                                  src={uploadedImage}
                                  alt=""
                                  width={250}
                                  height={250}
                                />
                              </a>
                            </Suspense>
                          </div>

                          <Button
                            type={"button"}
                            onClick={() => setUploadedImage("")}
                            className="group relative mt-4 mb-4 flex h-10 w-36 cursor-pointer items-center justify-center overflow-hidden rounded-md border-none text-base text-white after:transition-[width] after:duration-500 focus-within:ring-2 focus-within:ring-black focus-within:ring-offset-2 bg-black p-4 disabled:pointer-events-none"
                            data-ut-element="button"
                            data-state="ready"
                          >
                            Change Photo
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <UploadDropzone
                            className="ut-button:bg-black ut-label:text-black ut-ready:border-solid ut-ready:border-black ut-uploading:border-solid ut-uploading:border-black cursor-pointer"
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                              toast({
                                title: "Congratulations!",
                                description: (
                                  <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                                    <code className="text-white">
                                      Photo uploaded successfully
                                    </code>
                                  </pre>
                                ),
                              });
                              form.setValue("imageUrl", `${res[0].url}`);
                              setUploadedImage(res[0].url);
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription>
                    {/* {files.length > 0 && (
                    <div>
                      <Button onClick={handleUpload}>Upload Image</Button>
                    </div>
                  )} */}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="musicUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Music</FormLabel>
                  <FormControl>
                    <div>
                      {!musicUrl ? (
                        <UploadDropzone
                          // {...field}
                          className="ut-button:bg-black ut-label:text-black ut-ready:border-solid ut-ready:border-black ut-uploading:border-solid ut-uploading:border-black cursor-pointer"
                          endpoint="musicUploader"
                          onClientUploadComplete={(res) => {
                            toast({
                              title: "Congratulations!",
                              description: (
                                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                                  <code className="text-white">
                                    Music uploaded successfully
                                  </code>
                                </pre>
                              ),
                            });
                            form.setValue("musicUrl", res[0].url);
                            form.setValue("musicName", `${res[0].name}`);
                            setMusicUrl(res[0].url);
                            setMusicName(res[0].name);
                          }}
                        />
                      ) : (
                        // <UploadButton
                        //   className="ut-button:bg-black ut-button:ut-readying:bg-black ut-button:ut-uploading:bg-black cursor-pointer"
                        //   endpoint="musicUploader"
                        //   onClientUploadComplete={(res) => {
                        //     console.log("Files", res[0]);
                        //     toast({
                        //       title: "Congratulations!",
                        //       description: (
                        //         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        //           <code className="text-white">
                        //             Music uploaded successfully
                        //           </code>
                        //         </pre>
                        //       ),
                        //     });
                        //     setMusicUrl(res[0].url);
                        //     setMusicName(res[0].name);
                        //   }}
                        // />
                        <div
                          className="mt-2 flex flex-col items-center justify-center rounded-lg border border-black text-center h-[245px] px-6 py-2 ut-button:bg-black ut-label:text-black ut-ready:border-solid ut-ready:border-black ut-uploading:border-solid ut-uploading:border-black cursor-pointer
                      "
                        >
                          <div className="flex-center bg-dark-3 flex h-72 cursor-pointer flex-col overflow-hidden rounded-md bg-grey-50 items-center justify-center">
                            <div>
                              <a
                                target="_blank"
                                href={musicUrl}
                                rel="noopener noreferrer"
                                className="flex flex-col items-center gap-4"
                              >
                                <LuMusic size={32} />
                                <h1 className="underline text-red-800 text-xl">
                                  {musicName}
                                </h1>
                              </a>
                            </div>
                          </div>

                          <Button
                            type={"button"}
                            onClick={() => (setMusicUrl(""), setMusicName(""))}
                            className="group relative mb-8 flex h-10 w-36 cursor-pointer items-center justify-center overflow-hidden rounded-md border-none text-base text-white after:transition-[width] after:duration-500 focus-within:ring-2 focus-within:ring-black focus-within:ring-offset-2 bg-black p-4 disabled:pointer-events-none"
                            data-ut-element="button"
                            data-state="ready"
                          >
                            Change Music
                          </Button>
                        </div>
                      )}
                    </div>
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
                    &rsquo;Queen of the Striptease&rsquo; Competition?
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
          </fieldset>
        </form>
      </Form>
    </div>
  );
};

export default ApplicationForm;
