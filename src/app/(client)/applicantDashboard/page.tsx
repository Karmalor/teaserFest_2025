import ApplicationList from "@/components/ApplicationList";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { formSubmissions } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import Link from "next/link";
import React, { Suspense, useEffect } from "react";

interface User {
  primaryEmailAddress?: { emailAddress?: string };
  firstName: string;
}

interface Application {
  id: string;
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

  const applications: Application[] = await db

    .select()
    .from(formSubmissions)
    .where(
      eq(
        formSubmissions.applicant,
        user!.primaryEmailAddress!.emailAddress ?? ""
      )
    )
    .orderBy(formSubmissions.createdAt);

  if (!applications) {
    throw new Error("Applications not found");
  }

  return (
    <div className="max-w-xl md:mx-auto py-8 px-0 md:p-8 text-black text-center  m-4 md:m-10 mt-10 shadow-[8px_8px_0_0_#FE3D02] border-black border-2">
      <div className="justify-center">
        <h1 className="text-4xl mb-10">Welcome {user.firstName}</h1>
        <div className="text-justify p-2">
          <h1 className="font-black">
            January 16th-19th, 2025 in New Orleans, LA
          </h1>
          <br />
          <p>
            Teaser Festival is a four day celebration of Burlesque, fine food,
            well-crafted beverages, and live entertainment; an exploration of
            talented and varied bodies, incredible music, and the city of New
            Orleans which is the ‘Cradle of Creation’ for the art forms that
            celebrate all of these ideals.
          </p>
          <br />
          <p>
            Teaser Festival features the best burlesque performers from across
            the globe as well as hometown heroes, live music from New Orleans,
            and emphasizes the tapestried cocktail, beverage, and the culinary
            scene only found in New Orleans.
          </p>
          <br />
          <p>
            Below is the Teaser Festival Application button. You may purchase an
            application for $25 at the link below. You may purchase multiple
            applications if you wish to submit multiple acts to the festival.
            The showcases cover a wide range of styles and themes, from classic
            live-jazz, to prop-heavy variety, to fetish. Teaser Festival
            welcomes a wide-array of styles and acts. Your application progress
            will be saved to your account as you work on it, so you are free to
            return to this page later to review, finish, and submit at your
            leisure.
          </p>
          <br />
          <p className="font-black">
            All applications must be submitted by October 31st, 2024
          </p>
          <br />
          <p>We look forward to reviewing your act!</p>
          <br />
        </div>
        {applications ? (
          <div>
            <Suspense fallback={<h1>Loading...</h1>}>
              <ApplicationList applications={applications} />
            </Suspense>
            <div className="flex pt-8 justify-center">
              <Link href="/payment">
                <Button>Click to purchase an Application submission</Button>
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
