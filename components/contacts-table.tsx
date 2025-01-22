"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegPauseCircle } from "react-icons/fa";
import { FaRegTimesCircle } from "react-icons/fa";
import { FaRegCircleRight } from "react-icons/fa6";
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
import { FaEdit } from "react-icons/fa";
import { deleteContact } from "@/utils/contact";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ContactsTableProps = {
  contacts: any[];
};

const ContactsTable = ({ contacts }: ContactsTableProps) => {
  const router = useRouter();

  return (
    <Table>
      <TableCaption>List of contacts.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="max-w-[100px]">ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Settings</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {contacts.map((contact, i) => (
          <TableRow key={contact._id}>
            <TableCell className="font-medium">{i + 1}</TableCell>
            <TableCell className="font-medium">{contact.name}</TableCell>
            <TableCell className="font-medium">{contact.email}</TableCell>
            <TableCell className="font-medium">{contact.phone}</TableCell>
            <TableCell className="font-medium">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost">Manage</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="start">
                  <DropdownMenuLabel>Contact Settings</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <FaEdit />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push(`/composer`)}>
                      <FaRegCircleRight />
                      Send Email
                    </DropdownMenuItem>
                    {!contact.enabled ? (
                      <DropdownMenuItem>
                        <FaRegCheckCircle />
                        Enable
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem>
                        <FaRegPauseCircle />
                        Disable
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={async () => {
                      const deletedContact = await deleteContact(contact._id);
                      toast(`Deleted contact ${deletedContact.email}`);
                      router.refresh();
                    }}
                  >
                    <FaRegTimesCircle />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ContactsTable;
