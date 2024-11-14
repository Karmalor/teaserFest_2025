"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SelectTicket } from "@/db/schema";
import { QRCodeSVG } from "qrcode.react";
import React from "react";

type QRCodeProps = {
  ticketData: SelectTicket;
};

const QRCard = ({ ticketData }: QRCodeProps) => {
  return (
    <Card className="w-[300px] flex flex-col justify-center items-center">
      <CardHeader>
        <CardTitle>
          <QRCodeSVG
            size={250}
            value={ticketData.id}
            bgColor="#FFF0F0"
            fgColor="#000"
            imageSettings={{
              height: 24,
              width: 36,
              src: "/TeaserFest Vintage Logo 2025_v9.png",
              excavate: true,
            }}
            className="w-full object-fill"
          ></QRCodeSVG>
        </CardTitle>
        <CardDescription>
          {/* <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          > */}
          {ticketData.firstName} {ticketData.lastName}
          {/* </a> */}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <h1>{ticketData.ticketType}</h1>
        <p>The Civic Theater</p>
        <p>Fri, 17th of January</p>
      </CardContent>
      {/* <CardFooter>
        <p>Card Footer</p>
      </CardFooter> */}
    </Card>
  );
};

export default QRCard;
