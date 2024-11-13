import "./globals.css";
import { Inter } from "next/font/google";
import Nav from "./(components)/Nav";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import SessionProvider from "@/app/(utils)/SessionProvider";
import { getServerSession } from "next-auth";

config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ticket App",
  description: "Your ticket management made simple and efficient.",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();

  return (
    <html lang="en" className="h-full scroll-smooth bg-gray-50">
      <body className={`${inter.className} h-full`}>
        <SessionProvider session={session}>
          <div className="flex flex-col min-h-screen">
            <Nav />
            <main className="flex-grow overflow-y-auto bg-page text-default-text p-6">
              {children}
            </main>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
