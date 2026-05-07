import React from "react";

export default function WebLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="web-layout max-w-[608px] mx-auto px-6 lg:px-0 pt-12 pb-24">
      {children}
    </div>
  );
}