import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { applicationOrdersTable, formSubmissionsTable } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import Link from "next/link";
import React from "react";

const page = async () => {
  const user = await currentUser();

  if (!user) {
    return;
  }
  // let jsonData = [];

  const applications = await db

    .select()
    .from(formSubmissionsTable)
    .where(
      eq(
        formSubmissionsTable.applicant,
        user!.primaryEmailAddress!.emailAddress
      )
    );

  if (!applications) {
    throw new Error("Form not found");
  }

  return (
    <div className="max-w-xl md:mx-auto py-4 px-2 md:p-10 text-black text-center  m-10  shadow-[8px_8px_0_0_#FE3D02] border-black border-2">
      <div className="justify-center">
        <h1 className="text-4xl mb-10">Welcome {user.firstName}</h1>

        {applications ? (
          <div>
            {applications.map((application, index) => (
              <div
                key={index}
                className="flex flex-row gap-4 p-4 items-center justify-between"
              >
                <div className="flex flex-row gap-4 p-4 items-center">
                  <h1>Application #{index + 1}</h1>
                  {!application.applicationSubmitted ? (
                    <h1>- In progress</h1>
                  ) : (
                    <h1>- Submitted!</h1>
                  )}
                </div>
                <Link href={`/application/${application.uuid}`}>
                  <Button>Continue</Button>
                </Link>
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
