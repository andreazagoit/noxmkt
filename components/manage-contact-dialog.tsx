import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { patchContact } from "@/utils/contact";
import { useRouter } from "next/navigation";

type ManageContactDialogProps = {
  activeContact: any;
  setActiveContact: Dispatch<SetStateAction<any>>;
};

const ManageContactDialog = ({
  activeContact,
  setActiveContact,
}: ManageContactDialogProps) => {
  const [firstName, setFirstName] = useState(activeContact.firstName);
  const [lastName, setLastName] = useState(activeContact.lastName);
  const [email, setEmail] = useState(activeContact.email);
  const [phone, setPhone] = useState(activeContact.phone);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Update state if activeContact changes
    setFirstName(activeContact.firstName);
    setLastName(activeContact.lastName);
    setEmail(activeContact.email);
    setPhone(activeContact.phone);
  }, [activeContact]);

  const handleEditContact = async () => {
    try {
      setLoading(true);
      setError(null);

      // Send empty array for tags
      const updatedContact = await patchContact(activeContact._id, {
        firstName,
        lastName,
        email,
        phone,
        tags: [], // Empty array for tags
      });

      router.refresh();
      setActiveContact(null); // Close the dialog after successful update
    } catch (err) {
      setError("Error updating contact. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={!!activeContact}
      onOpenChange={(open) => setActiveContact(null)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Contact</DialogTitle>
          <DialogDescription>Edit the selected contact</DialogDescription>
          {error && <div className="text-red-500">{error}</div>}
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
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setActiveContact(null)}>
            Cancel
          </Button>
          <Button onClick={handleEditContact} disabled={loading}>
            {loading ? "Saving..." : "Save Edit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ManageContactDialog;
