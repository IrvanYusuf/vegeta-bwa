import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

// components
import { Toaster } from "@/components/ui/toaster";
import { ProviderWrapper } from "./ProviderWrapper";

// utils
import { cn } from "@/lib/utils";

// styles
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Vegeta",
  description: "Vegeta",
  applicationName: "Vegeta",
  authors: {
    name: "Irvan Yusuf Cahyadi",
    url: "https://irvanyusufcahyadi.vercel.app",
  },
  icons: "/logo.svg",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(poppins.className, "text-neutral-600")}>
        <NextTopLoader height={4} color="#4cd964" showSpinner={false} />
        <ProviderWrapper>{children}</ProviderWrapper>
        <Toaster />
      </body>
    </html>
  );
}
