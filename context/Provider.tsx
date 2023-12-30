"use client";
import React from "react";
import { SessionProvider, useSession } from "next-auth/react";
import { Session } from "next-auth";



export const Provider = ({
  children,
  session
 
}: {
  children: React.ReactNode;
  session: any

}) => {

  
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
