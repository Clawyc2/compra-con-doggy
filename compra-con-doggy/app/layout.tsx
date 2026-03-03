import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "$DOGGY — La Memecoin Mexicana en Solana",
  description: "Compra $DOGGY con SPEI desde $50 pesos. Sin KYC. Sin exchanges. El primer onramp cripto para México y LATAM.",
  keywords: ["DOGGY", "memecoin", "mexico", "solana", "crypto", "MXN", "SPEI", "onramp"],
  openGraph: {
    title: "$DOGGY — La Memecoin Mexicana",
    description: "Compra $DOGGY con SPEI desde $50 pesos. Sin KYC. Sin exchanges.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
