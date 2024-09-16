import React from "react";

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
import { LuCheck, LuChevronsUpDown } from "react-icons/lu";

const showcases = [
  {
    value: "fetish",
    label: "Fetish",
  },
  {
    value: "varietease",
    label: "Varietease",
  },
  {
    value: "sensualite",
    label: "Sensualité",
  },
  {
    value: "queenOfTheStripetease",
    label: "Queen of the Striptease",
  },
  {
    value: "localsOnly",
    label: "Locals Only",
  },
  {
    value: "champagneGala",
    label: "The Champagne Gala",
  },
  {
    value: "queensTea",
    label: "The Queen's Tea",
  },
];

const ShowcaseSelector = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? showcases.find((showcase) => showcase.value === value)?.label
            : "Select showcase..."}
          <LuChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search showcases..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {showcases.map((showcase) => (
                <CommandItem
                  key={showcase.value}
                  value={showcase.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <LuCheck
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === showcase.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {showcase.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ShowcaseSelector;
