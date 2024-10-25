import React from "react";
import PageHeader from "../_components/PageHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/db";
import { ticketTypesTable } from "@/db/schema";
import { LuCheckCircle2, LuMoreVertical, LuXCircle } from "react-icons/lu";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import {
  DropdownMenu,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ActiveToggleDropdownItem,
  DeleteDropdownItem,
} from "../_components/TicketActions";
import { Separator } from "@/components/ui/separator";
import { asc, desc } from "drizzle-orm";

const TicketsPage = () => {
  return (
    <>
      <div className="flex justify-between items-center gap-4">
        <PageHeader>Products</PageHeader>
        <Button asChild>
          <Link href="/admin/tickets/new">Add Ticket</Link>
        </Button>
      </div>
      <TicketsTable />
    </>
  );
};

export default TicketsPage;

async function TicketsTable() {
  const tickets = await db
    .select()
    .from(ticketTypesTable)
    .orderBy(desc(ticketTypesTable.createdAt));

  if (tickets.length === 0) {
    return <h1>No products found</h1>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-0">
            <span className="sr-only">Available for purchase</span>
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Orders</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tickets.map((ticket) => (
          <TableRow key={ticket.id}>
            <TableCell>
              {ticket.isAvailableForPurchase ? (
                <>
                  <LuCheckCircle2 />
                  <span className="sr-only">Available</span>
                </>
              ) : (
                <>
                  <LuXCircle className="stroke-destructive" />
                  <span className="sr-only">Unavailable</span>
                </>
              )}
            </TableCell>
            <TableCell>{ticket.name}</TableCell>
            <TableCell>
              {formatCurrency((ticket.priceInCents || 0) / 100)}
            </TableCell>
            <TableCell>{ticket.description}</TableCell>

            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <LuMoreVertical />
                  <span className="sr-only">Actions</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <a download href={`/admin/tickets/${ticket.id}/download`}>
                      Download
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/admin/tickets/${ticket.id}/edit`}>Edit</Link>
                  </DropdownMenuItem>
                  <ActiveToggleDropdownItem
                    id={ticket.id}
                    isAvailableForPurchase={ticket.isAvailableForPurchase}
                  />
                  <DropdownMenuSeparator />
                  <Separator />
                  <DeleteDropdownItem
                    id={ticket.id}
                    disabled={ticket.isAvailableForPurchase == true}
                  />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
