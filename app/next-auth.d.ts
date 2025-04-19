import "next-auth";

declare module "next-auth" {
  interface User {
    id: string; // Add the `id` property
  }

  interface Session {
    user: User; // Ensure the session includes the extended User type
  }
}