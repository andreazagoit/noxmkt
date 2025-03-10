import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { MdRefresh } from "react-icons/md";

const RefreshPageButton = () => {
  const router = useRouter();

  return (
    <Button variant="outline" onClick={() => router.refresh()}>
      <MdRefresh />
      Aggiorna
    </Button>
  );
};

export default RefreshPageButton;
