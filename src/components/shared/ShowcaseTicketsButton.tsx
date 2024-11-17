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
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { LuArrowRight } from "react-icons/lu";
import ShowcasePhoto from "@/app/(client)/schedule/_components/ShowcasePhoto";
import { Label } from "../ui/label";

const ShowcaseTicketsButton = () => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          <Button
            onClick={toggleModal}
            className="rounded-none bg-[#FE3D02] hover:scale-110 transition-all hover:bg-[#FE3D02] hover:ml-8 hover:mb-1"
          >
            Buy Tickets!
            <br />
            <LuArrowRight />
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#FFF0F0]  border-black border-2">
        <DialogHeader>
          <DialogTitle>Select your tickets</DialogTitle>
          <DialogDescription>
            <div className="relative text-center">
              <div className="pointer-events-none">
                <ShowcasePhoto />
              </div>
              <div className="absolute inset-0 flex items-center justify-center z-50">
                <h1 className="text-[#FE3D02] text-3xl ">VarieTEASE</h1>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        {/* <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value="Pedro Duarte"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Username
                    </Label>
                    <Input
                      id="username"
                      value="@peduarte"
                      className="col-span-3"
                    />
                  </div>
                </div> */}
        <div className="flex justify-center">
          <Tabs defaultValue="account" className="w-[300px]">
            <TabsList className="grid w-full grid-cols-2 bg-[#FFF0F0]">
              <TabsTrigger value="account">GA - $40</TabsTrigger>
              <TabsTrigger value="password">VIP - $100</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <Card className="border-none bg-[#FFF0F0] shadow-none">
                <CardHeader>
                  <CardTitle>General Admission includes:</CardTitle>
                  <CardDescription>
                    Seated ticket with clear sight lines room only ticket on the
                    17th of January, 2025 @ The Civic Theater
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1 flex gap-4 items-center">
                    <Label htmlFor="name">Qty</Label>
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="1" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="6">6</SelectItem>
                        <SelectItem value="7">7</SelectItem>
                        <SelectItem value="8">8</SelectItem>
                        <SelectItem value="9">9</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                {/* <CardFooter>
                          <Button>Save changes</Button>
                        </CardFooter> */}
              </Card>
            </TabsContent>
            <TabsContent value="password">
              <Card className="border-none bg-[#FFF0F0] shadow-none">
                {" "}
                <CardHeader>
                  <CardTitle>VIP Includes:</CardTitle>
                  <CardDescription>
                    Seated ticket with clear sight lines room only ticket on the
                    17th of January, 2025 @ The Civic Theater
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1 flex gap-4 items-center">
                    <Label htmlFor="name">Qty</Label>
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="1" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="6">6</SelectItem>
                        <SelectItem value="7">7</SelectItem>
                        <SelectItem value="8">8</SelectItem>
                        <SelectItem value="9">9</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                {/* <CardFooter>
                          <Button>Save password</Button>
                        </CardFooter> */}
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <DialogFooter>
          <Button type="submit">Add to cart</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShowcaseTicketsButton;
