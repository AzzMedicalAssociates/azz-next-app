"use client";
import { removeCombinedData } from "@/Redux/combinedDataSlice";
import { removePatient } from "@/Redux/patientSlice";
import { removeProvidersData } from "@/Redux/providersDataSlice";
import { removeProvidersId } from "@/Redux/providersIdSlice";
import { addScreen } from "@/Redux/screenSlice";
import { removeSlotsData } from "@/Redux/slotsDataSlice";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";

const HomeLink = ({ children }) => {
  const dispatch = useDispatch();
  return (
    <Link
      href={"/"}
      onClick={() => {
        dispatch(addScreen(1));
        dispatch(removePatient());
        dispatch(removeProvidersId());
        dispatch(removeProvidersData());
        dispatch(removeSlotsData());
        dispatch(removeCombinedData());
      }}
      style={{ display: "block", width: "100%" }}
    >
      {children}
    </Link>
  );
};

export default HomeLink;
