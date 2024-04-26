import { Roboto } from "next/font/google";
import "./globals.css";
import Navigation from "@/MyComponents/Navigation";
import Link from "next/link";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Logo from "../../public/logo.png";
import Image from "next/image";
import Footer from "@/MyComponents/Footer";
import { StoreProvider } from "@/Redux/StoreProvider";
import HomeLink from "@/MyComponents/HomeLink";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title:
    "Primary Care Providers in New Jersey and Taxas | Specialized Care Providers",
  description:
    "AZZ Medical Associates has a team of highly skilled and experienced primary care providers, with 6+ clinic locations in NJ and Texas, USA.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <StoreProvider>
        <body className={roboto.className}>
          <nav className="bg-[#1E328F] w-full h-[100px] flex items-center justify-between px-5 max-sm:justify-between  ">
            <div className="flex text-xl items-center justify-center gap-1 font-semibold text-white">
              <HomeLink>
                <Image
                  priority={true}
                  src={Logo}
                  height={150}
                  width={150}
                  alt="logo"
                  className="bg-white p-2 rounded"
                />
              </HomeLink>
            </div>
            <div className="flex items-center justify-center max-sm:hidden mr-10">
              <Navigation />
            </div>
            <div className="hidden items-center justify-center max-sm:flex ">
              <Sheet className="">
                <SheetTrigger>
                  <svg
                    xmlns="https://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-menu text-white"
                  >
                    <line x1="4" x2="20" y1="12" y2="12" />
                    <line x1="4" x2="20" y1="6" y2="6" />
                    <line x1="4" x2="20" y1="18" y2="18" />
                  </svg>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle className="bg-[#1E328F]/90 py-3 w-[90%] flex items-center justify-center ">
                      <HomeLink>
                        <Image
                          src={Logo}
                          height={"auto"}
                          width={100}
                          alt="logo"
                          className="p-2 rounded bg-white mx-auto"
                        />
                      </HomeLink>
                    </SheetTitle>
                    <div className="flex flex-col items-center justify-center w-full p-5 gap-1">
                      <div className="hover:bg-[#1E328F]/90 hover:text-white w-full py-5 text-center ">
                        <HomeLink>Home</HomeLink>
                      </div>
                      {/* <Link
                      href={"/contact-us"}
                      className="hover:bg-[#1E328F]/90 hover:text-white w-full py-5 text-center "
                    >
                      Contact Us
                    </Link> */}
                      <Link
                        href={"https://azzmedical.com/providers/"}
                        target="_blank"
                        className="hover:bg-[#1E328F]/90 hover:text-white w-full py-5 text-center "
                      >
                        Providers
                      </Link>
                      <Link
                        href={"https://azzmedical.com/services/"}
                        target="_blank"
                        className="hover:bg-[#1E328F]/90 hover:text-white w-full py-5 text-center "
                      >
                        Services
                      </Link>
                      <Link
                        href={"/provider-panel"}
                        target="_self"
                        className="hover:bg-[#1E328F]/90 hover:text-white w-full py-5 text-center  "
                      >
                        Provider Panel
                      </Link>
                      <Link
                        href={"/assistant-panel"}
                        target="_self"
                        className="hover:bg-[#1E328F]/90 hover:text-white w-full py-5 text-center  "
                      >
                        Assistant Panel
                      </Link>
                      {/* <Link
                      href={"/resources"}
                      className="hover:bg-[#1E328F]/90 hover:text-white w-full py-5 text-center "
                    >
                      Resources
                    </Link> */}
                      {/* <Link
                      href={"/articles"}
                      className="hover:bg-[#1E328F]/90 hover:text-white w-full py-5 text-center "
                    >
                      Articles
                    </Link> */}
                    </div>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
          </nav>
          {children}
          <Footer />
        </body>
      </StoreProvider>
    </html>
  );
}
