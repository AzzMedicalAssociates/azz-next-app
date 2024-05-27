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
import { addScreen } from "@/Redux/screenSlice";
import { removePatient } from "@/Redux/patientSlice";
import { removeProvidersId } from "@/Redux/providersIdSlice";
import { removeProvidersData } from "@/Redux/providersDataSlice";
import { removeSlotsData } from "@/Redux/slotsDataSlice";
import { removeCombinedData } from "@/Redux/combinedDataSlice";
import { useDispatch } from "react-redux";
import { removeSelectedProvider } from "@/Redux/selectedProviderSlice";
import { removeMap } from "@/Redux/mapSlice";

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
                  dispatch(removeSelectedProvider());
                  dispatch(removeMap());
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
          <NavigationMenuItem>
            <Link href={"/provider-panel"} target="_self" passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Provider Panel
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href={"/assistant-panel"} target="_self" passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Assistant Panel
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};

export default Navigation;
