"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { addContact } from "@/utils/contact";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type AddContactButtonProps = {
  projectId: string;
};

const AddContactButton = ({ projectId }: AddContactButtonProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [tags, setTags] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState<any>();

  const router = useRouter();

  const handleAddContact = async () => {
    try {
      // Split tags into an array
      const tagList = tags.split(",").map((tag) => tag.trim());

      // Call the addContact function
      const newContact = await addContact(projectId, {
        firstName,
        lastName,
        email,
        phone,
      });

      // Refresh the page and close the dialog
      router.refresh();
      setIsOpen(false);
      toast(`Added new contact: ${newContact.email}`);
    } catch (error: any) {
      console.error("Error adding contact:", error);
      setErrors(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>Add Contact</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a New Contact</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new contact to the project.
          </DialogDescription>
          {/* Display error messages if any */}
          {errors && <p className="text-red-500">{errors.message}</p>}
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Input
            placeholder="Tags (comma-separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button onClick={handleAddContact}>Add Contact</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddContactButton;
