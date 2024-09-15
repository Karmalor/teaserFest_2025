"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

let fullfilled = false;
let promise: Promise<void> | null = null;

const useTimeout = (ms: number) => {
  if (!fullfilled) {
    throw (promise ||= new Promise((res) => {
      setTimeout(() => {
        fullfilled = true;
        res();
      }, ms);
    }));
  }
};
const ApplicationList = ({ applications }: { applications: any }) => {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []);

  useTimeout(2000);

  return (
    <div>
      {applications.map((application: any, index: number) => (
        <div
          key={index}
          className="flex flex-row gap-4 p-2 items-center justify-between "
        >
          <div className="flex flex-row gap-4 p-2">
            <h1>Application: </h1>
            {application.applicantResponse.nameOfAct ? (
              <h1 className="text-start">
                {application.applicantResponse.nameOfAct}
              </h1>
            ) : (
              "..."
            )}
          </div>
          {application.applicationSubmitted ? (
            <h1 className="bg-gray-600 p-2 rounded-md text-white">Submitted</h1>
          ) : (
            <Link href={`/application/${application.uuid}`}>
              <Button>Continue</Button>
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default ApplicationList;
