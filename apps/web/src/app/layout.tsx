import "./globals.css";
import { Quicksand } from "next/font/google";
import TProvider from "@/providers/TProvider";

const qSand = Quicksand({ subsets: ["latin"] });

export const metadata = {
  title: "Teamsync",
  description: "A futsal management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={qSand.className}>
        <TProvider>{children}</TProvider>
      </body>
    </html>
  );
}
