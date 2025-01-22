"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

const NewProject = () => {
  const router = useRouter();
  const [newProjectName, setNewProjectName] = useState("");

  const handleCreateProject = async () => {
    if (!newProjectName.trim()) {
      console.log("Project name cannot be empty.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/project", {
        method: "PUT",
        body: JSON.stringify({ name: newProjectName }),
      });

      if (!response.ok) {
        throw new Error("Failed to create project");
      }

      const data = await response.json();

      router.push(`/projects/${data.project._id}`);
      router.refresh();
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <div className="py-4 flex justify-end">
      <Dialog>
        <DialogTrigger asChild>
          <Button>New Project</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <Input
            type="text"
            placeholder="New project name"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
          />
          <DialogFooter>
            <Button onClick={handleCreateProject}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewProject;
