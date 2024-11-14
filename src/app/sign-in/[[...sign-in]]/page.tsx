import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center items-center mt-16">
      <SignIn fallbackRedirectUrl={"/"} />
    </div>
  );
}
