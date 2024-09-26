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
import ApplicationForm from "@/components/forms/applicationForm";
import { CreateApplicationParams } from "@/types";

const ApplicationsPage = () => {
  const { user } = useUser();
  const [prefilledData, setPrefilledData] = useState<{} | null>(null);
  const [applicationSubmitted, setApplicationSubmitted] = useState<{} | null>(
    null
  );

  const params = useParams();

  const applicationId = params.applicationId as string;

  useEffect(() => {
    const fetchData = async () => {
      const result: any = await getFormSubmissionById(applicationId);
      // .then((res) => res.json());

      setPrefilledData(result[0].applicantResponse);
      setApplicationSubmitted(result[0].applicationSubmitted);
    };
    fetchData();
  }, []);

  // console.log(prefilledData);

  // function onSubmit(values: z.infer<typeof formSchema>) {
  //   // Do something with the form values.
  //   // ✅ This will be type-safe and validated.
  //   console.log(values);
  // }

  return (
    <div className="flex justify-center  border-black border-2  m-4 md:m-10 mt-10 lg:mx-48 shadow-[8px_8px_0_0_#FE3D02]">
      <div className="flex flex-col gap-2 items-start m-4 md:mx-48 mt-12">
        <h1 className="text-xl font-bold">Welcome {user?.fullName},</h1>
        <p>
          Please fill out the form below. Your progress will be saved, so you
          can leave this page and edit the information before submitting
        </p>
        {prefilledData ? (
          <ApplicationForm
            prefilledData={prefilledData}
            applicationSubmitted={applicationSubmitted}
          />
        ) : (
          <div>Loading...</div>
        )}

        <div className="mt-6 justify-end flex w-full"></div>
      </div>
    </div>
  );
};

export default ApplicationsPage;
