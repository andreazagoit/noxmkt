"use client";
import React from "react";
import { Button } from "./ui/button";
import { deleteProfile } from "@/utils/profiles";
import { useRouter } from "next/navigation";

type DeleteProfileButtonProps = {
  projectId: string;
  profileId: string;
};

const DeleteProfileButton = ({
  projectId,
  profileId,
}: DeleteProfileButtonProps) => {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      onClick={async () => {
        await deleteProfile(projectId, profileId);
        router.refresh();
      }}
    >
      Delete
    </Button>
  );
};

export default DeleteProfileButton;
