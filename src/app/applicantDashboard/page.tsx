import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { applicationOrdersTable, formSubmissionsTable } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import Link from "next/link";
import React from "react";

interface User {
  primaryEmailAddress?: { emailAddress?: string };
  firstName: string;
}

interface Application {
  uuid: string;
  applicantResponse:
    | {
        nameOfAct?: string;
      }
    | unknown;
  applicationSubmitted: boolean | null;
}

const page = async () => {
  const user = await currentUser();

  if (!user) {
    return;
  }
  // let jsonData = [];

  const applications: Application[] = await db

    .select()
    .from(formSubmissionsTable)
    .where(
      eq(
        formSubmissionsTable.applicant,
        user!.primaryEmailAddress!.emailAddress ?? ""
      )
    );

  // console.log(user.primaryEmailAddress?.emailAddress);

  if (!applications) {
    throw new Error("Applications not found");
  }

  return (
    <div className="max-w-xl md:mx-auto py-4 px-0 md:p-8 text-black text-center  m-4 md:m-10 mt-10 shadow-[8px_8px_0_0_#FE3D02] border-black border-2">
      <div className="justify-center">
        <h1 className="text-4xl mb-10">Welcome {user.firstName}</h1>

        {applications ? (
          <div>
            {applications.map((application: any, index) => (
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
                  <h1 className="bg-gray-600 p-2 rounded-md text-white">
                    Submitted
                  </h1>
                ) : (
                  <Link href={`/application/${application.uuid}`}>
                    <Button>Continue</Button>
                  </Link>
                )}
              </div>
            ))}
            <div className="flex pt-8 justify-center">
              <Link href="/payment">
                <Button>Click to purchase a Application submission</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div>Loading application link...</div>
        )}
      </div>
    </div>
  );
};

export default page;
