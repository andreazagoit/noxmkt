"use client";
import { wait } from "@/utils/wait";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdRefresh } from "react-icons/md";
import { Button } from "./ui/button";

const RefreshPageButton = () => {
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);

  const handleReload = () => {
    setDisabled(true);
    router.refresh();
    wait(2000);
    setDisabled(false);
  };

  return (
    <Button
      variant="outline"
      onClick={handleReload}
      className="hidden lg:flex"
      disabled={disabled}
    >
      <MdRefresh />
      Aggiorna
    </Button>
  );
};

export default RefreshPageButton;
