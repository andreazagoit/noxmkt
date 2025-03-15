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
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { addProfile } from "@/utils/profiles";

type AddProfileButtonProps = {
  projectId: string;
};

const AddProfileButton = ({ projectId }: AddProfileButtonProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    host: "",
    port: "",
    password: "",
    secure: true,
    default: false,
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newProfile = await addProfile(projectId, { ...formData });
      if (newProfile) {
        setIsDialogOpen(false);
        router.refresh();
      } else {
        console.error("Failed to add profile");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>Add Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Profile</DialogTitle>
            <DialogDescription>
              Fill in the details below to add a new profile.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              name="name"
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              name="host"
              type="text"
              placeholder="Host"
              value={formData.host}
              onChange={handleChange}
              required
            />
            <Input
              name="port"
              type="number"
              placeholder="Port"
              value={formData.port}
              onChange={handleChange}
              required
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label className="flex items-center space-x-2">
              <input
                name="secure"
                type="checkbox"
                checked={formData.secure}
                onChange={handleChange}
              />
              <span>Secure</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                name="default"
                type="checkbox"
                checked={formData.default}
                onChange={handleChange}
              />
              <span>Set as main account</span>
            </label>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProfileButton;
