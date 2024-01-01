declare module "next-auth-user-session" {
  interface Session {
    user?: User;
    token?: string;
    error?: string;
    refreshTocken?: string;
  }

  interface MyUser {
    name?: string;
    email?: string;
    password?: string;
    randomkey: string;
  }
}
