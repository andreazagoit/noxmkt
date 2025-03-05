"use client";
import { signOut as authSignOut } from "next-auth/react";

export function SignOut() {
  return <button onClick={() => authSignOut()}>Sign Out</button>;
}

/* export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button type="submit">Sign Out</button>
    </form>
  );
} */
