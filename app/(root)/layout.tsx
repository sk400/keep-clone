import { ClerkProvider, currentUser } from "@clerk/nextjs";
import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LayOut from "@/components/shared/LayOut";
import { fetchLabels } from "@/lib/actions/Label.actions";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Keep",
  description: "Home page",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  if (!user) return null;

  const userLabels = await fetchLabels(user.id);

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <LayOut labels={JSON.parse(JSON.stringify(userLabels))}>
            {children}
          </LayOut>
        </body>
      </html>
    </ClerkProvider>
  );
}
