"use client";

import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { addScreen } from "@/Redux/screenSlice";
import { removePatient } from "@/Redux/patientSlice";
import { removeProvidersId } from "@/Redux/providersIdSlice";
import { removeProvidersData } from "@/Redux/providersDataSlice";
import { removeSlotsData } from "@/Redux/slotsDataSlice";
import { removeCombinedData } from "@/Redux/combinedDataSlice";
import { useDispatch } from "react-redux";

const providers = [
  {
    id: 1,
    azz_id: 550773,
    name: "Johannelda Diaz",
    description: "Family Nurse Practitioner",
    profile:
      "https://i0.wp.com/azzmedical.com/wp-content/uploads/2023/11/Johannelda-1.jpg",
    status: "active",
    modes: "",
    state: "",
    address: "2279 NJ-33, Hamilton Township, NJ 08690, USA (Robbinsville)",
    address_id: 1,
    created_at: "2023-12-18T08:25:28.000000Z",
    updated_at: "2024-01-10T07:37:36.000000Z",
  },
  {
    id: 2,
    azz_id: 5501689,
    name: "Hazel Chavez",
    description: "Adult-Gerontology Nurse Practitioner",
    profile:
      "https://i0.wp.com/azzmedical.com/wp-content/uploads/2023/11/Hazel-Picture-1.png",
    status: "active",
    modes: "",
    state: "",
    address: "2279 NJ-33, Hamilton Township, NJ 08690, USA (Robbinsville)",
    address_id: 1,
    created_at: "2023-12-18T08:25:28.000000Z",
    updated_at: "2024-01-10T07:37:40.000000Z",
  },
  {
    id: 4,
    azz_id: 5503756,
    name: "Mabrigida Viaje",
    description: "Board Certified Nurse Practitioner",
    profile:
      "https://i0.wp.com/azzmedical.com/wp-content/uploads/2023/11/Mabrigida.jpg",
    status: "active",
    modes: "",
    state: "",
    address: "177 Main St Matawan, NJ 07747-3127",
    address_id: 2,
    created_at: "2023-12-18T08:25:28.000000Z",
    updated_at: "2024-01-10T07:37:59.000000Z",
  },
  {
    id: 5,
    azz_id: 54611407,
    name: "Shahid Meer",
    description: "Board Certified Internal Medicine & Pulmonology",
    profile:
      "https://i0.wp.com/azzmedical.com/wp-content/uploads/2023/11/2021-05-19.jpg?fit=261%2C322&ssl=1",
    status: "active",
    modes: "",
    state: "",
    address: "1440 PENNINGTON RD Ste 1,EWING NJ 08618-2669",
    address_id: 3,
    created_at: "2023-12-18T08:25:28.000000Z",
    updated_at: "2024-01-10T07:38:22.000000Z",
  },
  {
    id: 6,
    azz_id: 54612856,
    name: "Rajendra Gupta",
    description: "Board Certified Internal Medicine & Primary Care",
    profile:
      "https://i0.wp.com/azzmedical.com/wp-content/uploads/2023/11/2590319-1.jpg?fit=339%2C416&ssl=1",
    status: "active",
    modes: "",
    state: "",
    address: "1440 PENNINGTON RD Ste 1,EWING NJ 08618-2669",
    address_id: 3,
    created_at: "2023-12-18T08:25:28.000000Z",
    updated_at: "2024-01-10T07:38:25.000000Z",
  },
  {
    id: 7,
    azz_id: 55211587,
    name: "Rubina Raza",
    description: "Board Certified Internal Medicine & Primary Care",
    profile:
      "https://i0.wp.com/azzmedical.com/wp-content/uploads/2023/11/2590310.jpg?fit=336%2C433&ssl=1",
    status: "active",
    modes: "",
    state: "",
    address: "1440 PENNINGTON RD Ste 1,EWING NJ 08618-2669",
    address_id: 3,
    created_at: "2023-12-18T08:25:28.000000Z",
    updated_at: "2024-01-10T07:38:27.000000Z",
  },
  {
    id: 8,
    azz_id: 55211716,
    name: "Harold Brown",
    description: "Board Certified Internal Medicine & Primary Care",
    profile:
      "https://i0.wp.com/azzmedical.com/wp-content/uploads/2023/11/2590308.jpg?fit=336%2C433&ssl=1",
    status: "active",
    modes: "",
    state: "",
    address: "1440 PENNINGTON RD Ste 1,EWING NJ 08618-2669",
    address_id: 3,
    created_at: "2023-12-18T08:25:28.000000Z",
    updated_at: "2024-01-10T07:38:29.000000Z",
  },
  {
    id: 9,
    azz_id: 55211991,
    name: "Vida-Lynn Asiamah-Asare",
    description: "Adult Nurse Practitioner",
    profile:
      "https://i0.wp.com/azzmedical.com/wp-content/uploads/2023/11/2609652.jpg?fit=1024%2C943&ssl=1",
    status: "active",
    modes: "",
    state: "",
    address: "1440 PENNINGTON RD Ste 1,EWING NJ 08618-2669",
    address_id: 3,
    created_at: "2023-12-18T08:25:28.000000Z",
    updated_at: "2024-01-10T07:38:32.000000Z",
  },
  {
    id: 10,
    azz_id: 92810399,
    name: "Anh Huynh-Nguyen",
    description: "Family Nurse Practitioner",
    profile:
      "https://i0.wp.com/azzmedical.com/wp-content/uploads/2023/11/2590296.jpg?fit=336%2C433&ssl=1",
    status: "active",
    modes: "",
    state: "",
    address: "1440 PENNINGTON RD Ste 1,EWING NJ 08618-2669",
    address_id: 3,
    created_at: "2023-12-18T08:25:28.000000Z",
    updated_at: "2024-01-10T07:38:35.000000Z",
  },
  {
    id: 11,
    azz_id: 92810404,
    name: "Geralda Oluwagbamila",
    description: "Certified Nurse Practitioner",
    profile:
      "https://i0.wp.com/azzmedical.com/wp-content/uploads/2023/11/2590298.png?fit=312%2C427&ssl=1",
    status: "active",
    modes: "",
    state: "",
    address: "1440 PENNINGTON RD Ste 1,EWING NJ 08618-2669",
    address_id: 3,
    created_at: "2023-12-18T08:25:28.000000Z",
    updated_at: "2024-01-10T07:38:38.000000Z",
  },
  {
    id: 12,
    azz_id: 92810462,
    name: "Irfan Huq",
    description: "Board Certified Internal Medicine & Primary Care",
    profile:
      "https://i0.wp.com/azzmedical.com/wp-content/uploads/2023/11/2590312.jpg?fit=317%2C359&ssl=1",
    status: "active",
    modes: "",
    state: "",
    address: "1440 PENNINGTON RD Ste 1,EWING NJ 08618-2669",
    address_id: 3,
    created_at: "2023-12-18T08:25:28.000000Z",
    updated_at: "2024-01-10T07:38:41.000000Z",
  },
  {
    id: 13,
    azz_id: 92810709,
    name: "Bhanwarlal Chowdhury",
    description: "Board Certified Internal Medicine & Primary Care",
    profile:
      "https://i0.wp.com/azzmedical.com/wp-content/uploads/2023/11/2590306.jpg?fit=336%2C433&ssl=1",
    status: "active",
    modes: "",
    state: "",
    address: "1440 PENNINGTON RD Ste 1,EWING NJ 08618-2669",
    address_id: 3,
    created_at: "2023-12-18T08:25:28.000000Z",
    updated_at: "2024-01-10T07:38:43.000000Z",
  },
  {
    id: 14,
    azz_id: 92810751,
    name: "Mohammad Younus",
    description: "Board Certified Internal Medicine & Primary Care",
    profile:
      "https://i0.wp.com/azzmedical.com/wp-content/uploads/2023/11/Dr.-Mohammad-Younus-scaled-1.jpeg?fit=768%2C1024&ssl=1",
    status: "active",
    modes: "",
    state: "",
    address: "1440 PENNINGTON RD Ste 1,EWING NJ 08618-2669",
    address_id: 3,
    created_at: "2023-12-18T08:25:28.000000Z",
    updated_at: "2024-01-10T07:38:45.000000Z",
  },
  {
    id: 15,
    azz_id: 92810752,
    name: "Shahzinah Nadeem",
    description: "Board Certified Internal Medicine & Primary Care",
    profile:
      "https://i0.wp.com/azzmedical.com/wp-content/uploads/2023/11/2593990.png?fit=351%2C380&ssl=1",
    status: "active",
    modes: "",
    state: "",
    address: "1245 WHITEHORSE MERCERVILLE RD, STE 418 TRENTON,NJ 08619-3831",
    address_id: 3,
    created_at: "2023-12-18T08:25:28.000000Z",
    updated_at: "2024-01-10T07:38:48.000000Z",
  },
  {
    id: 16,
    azz_id: 92810884,
    name: "Javier Taboada",
    description: "Board Certified Psychiatrist",
    profile:
      "https://i0.wp.com/azzmedical.com/wp-content/uploads/2023/11/Dr.-Javier-Taboada-scaled-1.jpeg?fit=768%2C1024&ssl=1",
    status: "active",
    modes: "",
    state: "",
    address: "1440 PENNINGTON RD Ste 1,EWING NJ 08618-2669",
    address_id: 3,
    created_at: "2023-12-18T08:25:28.000000Z",
    updated_at: "2024-01-10T07:38:51.000000Z",
  },
  {
    id: 17,
    azz_id: 92810933,
    name: "Kendie Castillo",
    description: "Certified Family Nurse Practitioner",
    profile:
      "https://i0.wp.com/azzmedical.com/wp-content/uploads/2023/11/2603757.jpg?fit=187%2C231&ssl=1",
    status: "active",
    modes: "",
    state: "",
    address: "1451 Route 88, Brick, NJ 08724",
    address_id: 5,
    created_at: "2023-12-18T08:25:28.000000Z",
    updated_at: "2024-01-10T07:39:25.000000Z",
  },
  {
    id: 18,
    azz_id: 92810965,
    name: "William Lou",
    description: "Internal Medicine and Gastroenterology",
    profile:
      "https://i0.wp.com/azzmedical.com/wp-content/uploads/2023/11/2594792.jpg?fit=216%2C256&ssl=1",
    status: "active",
    modes: "",
    state: "",
    address: "1245 WHITEHORSE MERCERVILLE RD, STE 418 TRENTON,NJ 08619-3831",
    address_id: 4,
    created_at: "2023-12-18T08:25:28.000000Z",
    updated_at: "2024-01-10T07:39:19.000000Z",
  },
  {
    id: 19,
    azz_id: 92810966,
    name: "Syed Ahmad",
    description: "Board Certified Internal Medicine & Primary Care",
    profile:
      "https://i0.wp.com/azzmedical.com/wp-content/uploads/2023/11/2593980-1.jpg?fit=372%2C500&ssl=1",
    status: "active",
    modes: "",
    state: "",
    address: "1245 WHITEHORSE MERCERVILLE RD, STE 418 TRENTON,NJ 08619-3831",
    address_id: 4,
    created_at: "2023-12-18T08:25:28.000000Z",
    updated_at: "2024-01-10T07:39:16.000000Z",
  },
  {
    id: 20,
    azz_id: 92810968,
    name: "Arti Khatri",
    description: "Board Certified Family Nurse Practitioner",
    profile:
      "https://i0.wp.com/azzmedical.com/wp-content/uploads/2023/11/2593992.png?fit=323%2C431&ssl=1",
    status: "active",
    modes: "",
    state: "",
    address: "1440 PENNINGTON RD Ste 1,EWING NJ 08618-2669",
    address_id: 3,
    created_at: "2023-12-18T08:25:28.000000Z",
    updated_at: "2024-01-10T07:38:58.000000Z",
  },
  {
    id: 21,
    azz_id: 92810982,
    name: "Selim Sheikh",
    description: "Board Certified in Internal Medicine",
    profile:
      "https://i0.wp.com/azzmedical.com/wp-content/uploads/2023/11/2593975.png?fit=354%2C384&ssl=1",
    status: "active",
    modes: "",
    state: "",
    address: "1245 WHITEHORSE MERCERVILLE RD, STE 418 TRENTON,NJ 08619-3831",
    address_id: 4,
    created_at: "2023-12-18T08:25:28.000000Z",
    updated_at: "2024-01-10T07:39:13.000000Z",
  },
  {
    id: 22,
    azz_id: 92810987,
    name: "Mushtaq Memon",
    description: "Board Certified Family Medicine",
    profile:
      "https://i0.wp.com/azzmedical.com/wp-content/uploads/2023/11/2590302.jpg?fit=336%2C433&ssl=1",
    status: "active",
    modes: "",
    state: "",
    address: "1440 PENNINGTON RD Ste 1,EWING NJ 08618-2669",
    address_id: 3,
    created_at: "2023-12-18T08:25:28.000000Z",
    updated_at: "2024-01-10T07:39:01.000000Z",
  },
  {
    id: 23,
    azz_id: 92810998,
    name: "Spring Matthews-Brown",
    description: "Board Certified Internal Medicine & Primary Care",
    profile:
      "https://i0.wp.com/azzmedical.com/wp-content/uploads/2023/11/2594060-1.png?fit=325%2C300&ssl=1",
    status: "active",
    modes: "",
    state: "",
    address: "1440 PENNINGTON RD Ste 1,EWING NJ 08618-2669",
    address_id: 3,
    created_at: "2023-12-18T08:25:28.000000Z",
    updated_at: "2024-01-10T07:39:05.000000Z",
  },
  {
    id: 24,
    azz_id: 92811051,
    name: "David Bresch",
    description: "Psychiatry",
    profile:
      "https://i0.wp.com/azzmedical.com/wp-content/uploads/2023/11/Dr.-Davids-Finally-good-pic-scaled-3.jpg?fit=768%2C1024&ssl=1",
    status: "active",
    modes: "",
    state: "",
    address: "177 Main St Matawan, NJ 07747-3127",
    address_id: 2,
    created_at: "2023-12-18T08:25:28.000000Z",
    updated_at: "2024-01-10T07:38:07.000000Z",
  },
  {
    id: 25,
    azz_id: 92811094,
    name: "Fazal Panezai",
    description: null,
    profile: null,
    status: "active",
    modes: "",
    state: "",
    address: "177 Main St Matawan, NJ 07747-3127",
    address_id: 2,
    created_at: "2023-12-18T08:25:28.000000Z",
    updated_at: "2024-01-10T07:38:10.000000Z",
  },
  {
    id: 26,
    azz_id: 92811129,
    name: "La-Toya Newsome",
    description: "Nurse Practitioner",
    profile:
      "https://i0.wp.com/azzmedical.com/wp-content/uploads/2023/11/Lotoya-Newsome-picture-1-1.jpg?fit=480%2C512&ssl=1",
    status: "active",
    modes: "",
    state: "",
    address: "177 Main St Matawan, NJ 07747-3127",
    address_id: null,
    created_at: "2023-12-18T08:25:28.000000Z",
    updated_at: "2024-01-09T08:51:56.000000Z",
  },
  {
    id: 27,
    azz_id: 92811140,
    name: "Fouad Albana",
    description: "Board Certified Internal Medicine & Primary Care",
    profile:
      "https://i0.wp.com/azzmedical.com/wp-content/uploads/2023/11/image_50390273-scaled-1.jpg?fit=768%2C1024&ssl=1",
    status: "active",
    modes: "",
    state: "",
    address: "2080 State Route 35, Holmdel, NJ 07733-1090 ",
    address_id: null,
    created_at: "2023-12-18T08:25:28.000000Z",
    updated_at: "2024-01-09T08:52:13.000000Z",
  },
  {
    id: 28,
    azz_id: 92811141,
    name: "Virginia Atieh",
    description: "Family Nurse Practitioner",
    profile:
      "https://i0.wp.com/azzmedical.com/wp-content/uploads/2023/11/Virginia-Nurse-Practitioner-1-e1692818708190.png?fit=474%2C781&ssl=1",
    status: "active",
    modes: "",
    state: "",
    address: "2080 State Route 35, Holmdel, NJ 07733-1090 ",
    address_id: null,
    created_at: "2023-12-18T08:25:28.000000Z",
    updated_at: "2024-01-09T08:52:26.000000Z",
  },
  {
    id: 29,
    azz_id: 92811153,
    name: "Ghazali Chaudry",
    description: "General Surgeon",
    profile:
      "https://i0.wp.com/azzmedical.com/wp-content/uploads/2023/11/Dr-Ghazali-Anwar-Pic-1.png?fit=768%2C1024&ssl=1",
    status: "active",
    modes: "",
    state: "",
    address: "1440 PENNINGTON RD Ste 1,EWING NJ 08618-2669",
    address_id: null,
    created_at: "2023-12-18T08:25:28.000000Z",
    updated_at: "2024-01-09T08:52:48.000000Z",
  },
  {
    id: 30,
    azz_id: 92811154,
    name: "Coleen Serzanin",
    description: "Psychiatric Nurse Practitioner, PMHNP-NP",
    profile:
      "https://i0.wp.com/azzmedical.com/wp-content/uploads/2023/11/Coleen-M.-Serzanin-copy.jpg?fit=360%2C520&ssl=1",
    status: "active",
    modes: "",
    state: "",
    address: "177 Main St Matawan, NJ 07747-3127",
    address_id: null,
    created_at: "2023-12-18T08:25:28.000000Z",
    updated_at: "2024-01-09T08:53:04.000000Z",
  },
  {
    id: 31,
    azz_id: 92811158,
    name: "Lisa Dipietropolo",
    description: "Nurse Practitioner",
    profile:
      "https://i0.wp.com/azzmedical.com/wp-content/uploads/2023/11/IMG_2222.jpg?fit=180%2C240&ssl=1",
    status: "active",
    modes: "",
    state: "",
    address: "177 Main St Matawan, NJ 07747-3127",
    address_id: null,
    created_at: "2023-12-18T08:25:28.000000Z",
    updated_at: "2024-01-09T08:53:20.000000Z",
  },
  {
    id: 32,
    azz_id: 92811159,
    name: "Basma Khan",
    description: "Board Certified in Internal Medicine by ABIM",
    profile:
      "https://i0.wp.com/azzmedical.com/wp-content/uploads/2023/11/unnamed__1_.jpg?fit=429%2C642&ssl=1",
    status: "active",
    modes: "",
    state: "",
    address: "200 PERRINE RD STE 223, OLD BRIDGE NJ 08857-2836",
    address_id: null,
    created_at: "2023-12-18T08:25:28.000000Z",
    updated_at: "2024-01-09T08:53:33.000000Z",
  },
  {
    id: 33,
    azz_id: 92811163,
    name: "Mohammad Anwar",
    description: "Board Certified Internal Medicine & Primary Care",
    profile:
      "https://i0.wp.com/azzmedical.com/wp-content/uploads/2023/11/Picture-1.jpg?fit=446%2C446&ssl=1",
    status: "active",
    modes: "",
    state: "",
    address: "",
    address_id: null,
    created_at: "2023-12-18T08:25:28.000000Z",
    updated_at: null,
  },
  {
    id: 35,
    azz_id: 55215000,
    name: "Uzma Kewan,MD ",
    description: "Board Certified Family Medicine",
    profile: null,
    status: "active",
    modes: "",
    state: "",
    address: "1440 PENNINGTON RD Ste 1,EWING NJ 08618-2669",
    address_id: null,
    created_at: "2024-01-09T08:34:26.000000Z",
    updated_at: "2024-01-09T08:54:57.000000Z",
  },
  {
    id: 36,
    azz_id: 55214945,
    name: "Rehan Shah, MD",
    description: "Rheumatologist",
    profile:
      "https://i0.wp.com/azzmedical.com/wp-content/uploads/2023/11/mypic-1.png?fit=678%2C1024&ssl=1",
    status: "active",
    modes: "",
    state: "",
    address: "2279 NJ-33, Hamilton Township, NJ 08690, USA",
    address_id: null,
    created_at: "2024-01-09T08:34:26.000000Z",
    updated_at: "2024-01-09T08:55:14.000000Z",
  },
];

const services = [
  { name: "Primary Care" },
  { name: "Chronic Care Management" },
  { name: "Annual Wellness" },
  { name: "Medicare Annual Wellness" },
  { name: "Behavioral Health Integration" },
  { name: "Internal Medicine" },
  { name: "Nephrology Services" },
  { name: "Irritable Bowel Syndrome" },
  { name: "Gerd" },
  { name: "Gastroenterology" },
  { name: "Annual Physical" },
  { name: "Telehealth" },
  { name: "Allergies" },
  { name: "Psychiatrist Services" },
  { name: "Dot Physicals" },
  { name: "Remote Patient Monitoring (RPM)" },
  { name: "Endoscopy" },
  { name: "Diabetes" },
  { name: "Principal Care Management" },
  { name: "Controlled Substances" },
  { name: "General Surgery" },
  { name: "Esophagogastroduodenoscopy" },
  { name: "Hypertension" },
  { name: "Hemorrhoids" },
  { name: "Asthma" },
  { name: "Colonoscopy" },
  { name: "Nursing Home Services" },
];

const Navigation = () => {
  const dispatch = useDispatch();
  return (
    <>
      <NavigationMenu>
        <NavigationMenuList className="flex items-center justify-center ">
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink
                onClick={() => {
                  dispatch(addScreen(1));
                  dispatch(removePatient());
                  dispatch(removeProvidersId());
                  dispatch(removeProvidersData());
                  dispatch(removeSlotsData());
                  dispatch(removeCombinedData());
                }}
                className={navigationMenuTriggerStyle()}
              >
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              href={"https://azzmedical.com/providers/"}
              target="_blank"
              passHref
            >
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Providers
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              href={"https://azzmedical.com/services/"}
              target="_blank"
              passHref
            >
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Services
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};

export default Navigation;
