import React from "react";

const ShowcasePhoto = () => {
  return (
    <div className=" relative w-full md:mx-auto md:mb-auto mb-4">
      <div className="absolute w-full h-full bg-indigo-900 bg-opacity-50 rounded-lg z-10 text-opacity-0 hover:opacity-0"></div>
      {/* <Image
        src="/Screenshot 2024-06-25 at 2.23.06 PM.png"
        alt="hello"
        width={800}
        height={1000}
        layout=""
        objectFit="contain"
        className="rounded-lg -z-10 grayscale"
      /> */}
      <img
        src="/Screenshot 2024-06-25 at 2.23.06 PM.png"
        className="rounded-lg grayscale "
      />
    </div>
  );
};

export default ShowcasePhoto;