import ShowcaseCard, { ShowcaseCardSkeleton } from "@/components/ShowcaseCard";
import { db } from "@/db";
import { SelectShowcase, showcases } from "@/db/schema";
import { cache } from "@/lib/cache";
import React, { Suspense } from "react";

const getShowcases = cache(() => {
  const showcaseList = db.select().from(showcases).orderBy(showcases.startDate);

  console.log(showcaseList);
  return showcaseList;
}, ["/showcases", "getShowcases"]);

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
          <ShowcaseSuspense />
        </Suspense>
      </div>
    </h1>
  );
}

async function ShowcaseSuspense() {
  const showcases = await getShowcases();

  return showcases.map((showcase, i) => (
    <div key={i} className="max-w-[400px]">
      <ShowcaseCard key={showcase.id} {...showcase} />
    </div>
  ));
}
