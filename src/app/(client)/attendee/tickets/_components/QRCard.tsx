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
        <CardTitle className="text-left mb-4">
          {!ticketData.isCheckedIn ? (
            <>
              <div className=" text-red-700">Not Checked In</div>
            </>
          ) : (
            <>
              <div className="text-green-700 ">Checked In</div>
            </>
          )}
        </CardTitle>
        <CardDescription className="text-left">
          {/* <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          > */}

          {/* </a> */}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-left">
        <h1>{ticketData.ticketType}</h1>
        <p>The Civic Theater</p>
        <p>Fri, 17th of January</p>
      </CardContent>
      {/* <CardFooter>
        <Image src={ticketData.imgUrl}/>
      </CardFooter> */}
    </Card>
  );
};

export default QRCard;
