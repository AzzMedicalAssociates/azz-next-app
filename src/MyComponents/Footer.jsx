import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "../../public/logo.png";
import HomeLink from "./HomeLink";

const Footer = () => {
  let date = new Date();
  let dateYear = date.getFullYear();
  return (
    <footer className="bg-[#1E328F] w-full  text-white flex items-center justify-between flex-col px-5 pb-2 gap-5">
      <div className="flex items-center justify-between w-full mt-5">
        <div className="flex items-center justify-center ">
          <HomeLink href={"/"}>
            <Image
              src={Logo}
              width={100}
              height={"auto"}
              alt="footer-logo"
              className="bg-white p-2 rounded"
            />
          </HomeLink>
        </div>
        <div className="flex items-center justify-center gap-5">
          <Link
            href={"https://www.facebook.com/azzmedicalofficial"}
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-facebook"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </Link>
          <Link href={"https://www.instagram.com/azzmedical/"} target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-instagram"
            >
              <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </Link>
          <Link
            href={"https://www.linkedin.com/in/azz-medical-associates/"}
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-linkedin"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect width={4} height={12} x={2} y={9} />
              <circle cx={4} cy={4} r={2} />
            </svg>
          </Link>
          <Link
            href={"https://www.youtube.com/@azzmedicalassociates"}
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-youtube"
            >
              <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
              <path d="m10 15 5-3-5-3z" />
            </svg>
          </Link>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center pb-4 w-full   text-center">
        © Copyright {dateYear} | All Rights Reserved | Powered By Theo
        Healthcare
      </div>
    </footer>
  );
};

export default Footer;
