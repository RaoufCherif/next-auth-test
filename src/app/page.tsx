"use client";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Link from "next/link";

export default function Home() {
  const { data, status } = useSession();
  const { data: session } = useSession();
  

  const logOut = async () => {
    await signOut();
  };
 console.log('je suis la session : ' , session)
  // const data = await getServerSession(authOptions);
  return (
    <main className="flex min-h-screen flex-raw  justify-end m-4 gap-4">
      
      <div>
        {session ? (
          <div className="flex flex-raw gap-2  content-center justify-end ">
            <p className="mt-2">Bonjour  {session.user?.name}</p>
            
            <button
              className="border bg-red-800 p-2  text-white rounded"
              onClick={logOut}
            >
              Logout
            </button>
            {/* <pre>   {JSON.stringify(session)}</pre> */}
          </div>
        ) : (
          <div>
          <Link href={"login"}>
            <button
              className="border bg-purple-800 p-2  text-white rounded"
            >
              Sign In
            </button>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
