"use client";

import { useParams } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
// import { QRCodeCanvas } from "qrcode.react";

function App() {
  const params = useParams();

  const ticketId = params.ticketId as string;

  console.log(ticketId);

  return (
    <div className="mb-16 mt-16 mx-auto min-h-full w-1/2">
      <header className="App-header">
        <div className="flex justify-center">
          <QRCodeSVG
            value={ticketId}
            bgColor="#FFF0F0"
            fgColor="#000"
            imageSettings={{
              height: 400,
              width: 400,
              src: "",
              excavate: false,
            }}
          ></QRCodeSVG>
        </div>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p></p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        ></a>
      </header>
    </div>
  );
}

export default App;
