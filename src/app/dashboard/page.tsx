"use client";
import React from "react";
import { getSession, signOut, useSession } from "next-auth/react";
import { Provider } from "../../../context/Provider";
import { SessionProvider } from "next-auth/react";
import AuthProvider from "../components/AuthProvider";

const DashboardPage =  () => {
  const logOut = async () => {
    await signOut();
  };

  const getMySession  = async () => {

          const session = await getSession();
          console.log("process.env.GOOGLE_CLIENT_ID")
          console.log(process.env.GOOGLE_CLIENT_ID)

          console.log(session?.user)
  }
  getMySession()
  //   const { status , data} = useSession({
  //     // required: true,

  //     // onUnauthenticated() {

  //     //     console.log('not logged in!')
  //     }
  // })

  const { status, data } = useSession();

  console.log("session object", status);
 
  //  if (status === 'loading') {
  //   return "Loading or unauthentificated";
  //  }
  return (
    <AuthProvider>
      <div>Bonjour {data?.user.randomkey}</div>
      <pre>{JSON.stringify(data, null, 2)}</pre>

      <div>
        <button
          className="border bg-purple-800 p-2  text-white rounded"
          onClick={logOut}
        >
          LogOut
        </button>
      </div>
    </AuthProvider>
  );
};

export default DashboardPage;
