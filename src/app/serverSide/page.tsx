import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import router from "next/router";
import { getUserSession } from "@/lib/session";

const page = async () => {
  const session = await getServerSession(authOptions);
  const user = await getUserSession();

  if (!session) {
    redirect("login");
  }

  return <div>{session?.user?.name}</div>;
};

export default page;
