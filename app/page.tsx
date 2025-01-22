import { auth } from "@/auth";
import SignIn from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (session?.user) redirect("/dashboard");

  return (
    <div>
      <SignIn />
      <SignOut />
    </div>
  );
}
