"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import EmailComposer from "./email-composer";

type OpenEmailEditorButtonProps = {
  projectId: string;
  open: boolean;
  onDimiss: () => void;
  onSave: (data) => void;
};

const OpenEmailEditorButton = ({
  projectId,
  open,
  onDimiss,
  onSave,
}: OpenEmailEditorButtonProps) => {
  return (
    <Dialog open={open} onOpenChange={onDimiss}>
      <DialogContent className="max-w-[90vw] h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Nuova campagna</DialogTitle>
          <DialogDescription>Crea nuova campagna</DialogDescription>
        </DialogHeader>
        <EmailComposer projectId={projectId} onSave={onSave} />
      </DialogContent>
    </Dialog>
  );
};

export default OpenEmailEditorButton;
