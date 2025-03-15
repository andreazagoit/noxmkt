"use client";
import React from "react";
import { Button } from "./ui/button";
import { setDefaultProfile } from "@/utils/profiles";
import { useRouter } from "next/navigation";

type SetDefaultProfileButtonProps = {
  profileId: string;
};

const SetDefaultProfileButton = ({
  profileId,
}: SetDefaultProfileButtonProps) => {
  const router = useRouter();
  const handleClick = async () => {
    await setDefaultProfile(profileId);
    router.refresh();
  };

  return (
    <Button onClick={handleClick} variant="outline">
      Set Default
    </Button>
  );
};

export default SetDefaultProfileButton;
