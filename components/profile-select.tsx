"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function ProfileSelect({ profiles }: { profiles: any }) {
  // Preselect the first profile (or any desired default)
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<any>(profiles[0]?.email || ""); // Preselect the first profile

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between mb-4"
        >
          {value
            ? profiles.find((profile) => profile.email === value)?.email
            : "Select email..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {profiles.map((profile) => (
                <CommandItem
                  key={profile._id}
                  value={profile.email}
                  onSelect={(currentValue: any) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {profile.email}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === profile.email ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default ProfileSelect;
