"use client";

import { QRCodeSVG } from "qrcode.react";

export default function TicketQR({ value }: { value: string }) {
  return (
    <QRCodeSVG 
      value={value} 
      size={44} 
      bgColor={"#ffffff"} 
      fgColor={"#000000"} 
      level={"Q"} 
    />
  );
}
