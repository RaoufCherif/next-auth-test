"use client";
import Image from "next/image";
import { authOptions } from "../api/auth/[...nextauth].ts/route";
import { useSession } from "next-auth/react";

export default function Home() {
  // const data = await getServerSession(authOptions);
  const { data } = useSession();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* {JSON.stringify(data)} */}
      {JSON.stringify(data)}
      Hello
    </main>
  );
}
