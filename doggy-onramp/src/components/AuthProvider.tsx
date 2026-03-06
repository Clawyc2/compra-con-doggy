"use client";

import { PrivyProvider } from "@privy-io/react-auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
      config={{
        loginMethods: ["email", "google"],
        embeddedWallets: {
          solana: {
            createOnLogin: "users-without-wallets",
          },
        },
        appearance: {
          theme: "#050d1f",
          accentColor: "#FFD700",
          logo: "https://doggy-latam.com/logo.png",
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
