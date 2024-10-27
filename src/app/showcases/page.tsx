import ShowcaseCard, { ShowcaseCardSkeleton } from "@/components/ShowcaseCard";
import { db } from "@/db";
import { SelectShowcase, showcaseTable } from "@/db/schema";
import React, { Suspense } from "react";

async function getShowcases() {
  const showcaseList = await db
    .select()
    .from(showcaseTable)
    .orderBy(showcaseTable.startDateTime);

  console.log(showcaseList);
  return showcaseList;
}

getShowcases();

const ShowcasesPage = () => {
  return (
    <div>
      <ShowcaseGrid showcaseFetcher={getShowcases} title="Showcases" />
    </div>
  );
};

export default ShowcasesPage;

type ShowcaseGridProps = {
  title: string;
  showcaseFetcher: () => Promise<SelectShowcase[]>;
};

function ShowcaseGrid({ showcaseFetcher, title }: ShowcaseGridProps) {
  return (
    <h1 className="space-y-4">
      <div className="flex gap-4">
        <h2 className="text-3xl font-bold mx-4">{title}</h2>
      </div>
      <div className="mx-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Suspense
          fallback={
            <>
              <div className="max-w-[400px]">
                <ShowcaseCardSkeleton />
              </div>
              <div className="max-w-[400px]">
                <ShowcaseCardSkeleton />
              </div>
              <div className="max-w-[400px]">
                <ShowcaseCardSkeleton />
              </div>
            </>
          }
        >
          <ShowcaseSuspense showcaseFetcher={showcaseFetcher} />
        </Suspense>
      </div>
    </h1>
  );
}

async function ShowcaseSuspense({
  showcaseFetcher,
}: {
  showcaseFetcher: () => Promise<SelectShowcase>[];
}) {
  return (await showcaseFetcher()).map((showcase) => (
    <div className="max-w-[400px]">
      <ShowcaseCard key={showcase.uuid} {...showcase} />
    </div>
  ));
}
