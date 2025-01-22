"use client";
import { sendEmail } from "@/utils/emails";
import React, { useState } from "react";
import { toast } from "sonner";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useRouter } from "next/navigation";

type EmailComposerProps = {
  projectId: string;
};

const EmailComposer = ({ projectId }: EmailComposerProps) => {
  const [text, setText] = useState("");
  const router = useRouter();

  const saveAsText = async () => {
    toast("Event has been created.");
    const mail = await sendEmail({
      projectId: projectId,
      email: "",
      receivers: {
        emails: [],
        tags: ["Everyone"],
      },
      data: {
        text: text,
        html: text,
      },
    });
  };

  return (
    <div className="flex flex-1">
      <div className="flex-1 flex flex-col lg:flex-[0.75]">
        <div className="h-16 flex px-4 items-center gap-4">
          <Input />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>Add Contact</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="mx-4 h-full mb-4">
          <Textarea
            placeholder="Write your email here..."
            className="w-full h-full p-4 resize-none"
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      </div>

      <div className="p-4 lg:flex-[0.25] bg-neutral-900 flex flex-col">
        <div className="mb-4 h-full">
          <button
            onClick={saveAsText}
            className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Save as Text
          </button>
        </div>
        <div className="flex gap-4">
          <Button
            className="flex-1"
            variant="secondary"
            onClick={() => router.back()}
          >
            Annulla
          </Button>
          <Button className="flex-1" onClick={() => saveAsText()}>
            Invia Email
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmailComposer;
