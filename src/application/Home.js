"use client";
import React, { useEffect, useState } from "react";
import Select, { components } from "react-select";
import Creatable from "react-select/creatable";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addScreen } from "@/Redux/screenSlice";
import { addPatient, removePatient } from "@/Redux/patientSlice";
import { addProvidersId, removeProvidersId } from "@/Redux/providersIdSlice";
import {
  addProvidersData,
  removeProvidersData,
} from "@/Redux/providersDataSlice";
import { addCauses } from "@/Redux/causesSlice";
import TextTransition, { presets } from "react-text-transition";
import { removeCombinedData } from "@/Redux/combinedDataSlice";
import { removeSlotsData } from "@/Redux/slotsDataSlice";
// import VideoBG from "/public/bg.mp4";

const CauseIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <svg
        xmlns="https://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
    </components.DropdownIndicator>
  );
};
const InsuranceIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <svg
        xmlns="https://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
        />
      </svg>
    </components.DropdownIndicator>
  );
};
const ModeIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <svg
        xmlns="https://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    </components.DropdownIndicator>
  );
};

const modeOptions = [
  { value: "Telehealth Appointment", label: "Telehealth Appointment" },
  { value: "Office Appointment", label: "Office Appointment" },
];

const Home = () => {
  const TEXTS = ["Doctor", "Practitioner", "Specialist", "Therapist"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      3000 // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  const [isMounted, setIsMounted] = useState(false);

  ///*! USE DISPATCH
  const dispatch = useDispatch();

  ///*! USE SELECTOR
  const causesSelector = useSelector((state) => state.causes);

  const [cause, setCause] = useState("");
  const [insurance, setInsurance] = useState("");
  const [mode, setMode] = useState("Office Appointment");

  const [loader, setLoader] = useState(false);

  const [causeOptions, setCauseOptions] = useState();
  const [insuranceOptions, setInsuranceOptions] = useState();

  ///*! Patient BY Cause
  const handleAddPatient = () => {
    if (mode === "") {
      dispatch(
        addPatient({
          cause: cause,
          insurance: insurance,
          mode: "Office Appointment",
        })
      );
    } else {
      dispatch(
        addPatient({
          cause: cause,
          insurance: insurance,
          mode: mode,
        })
      );
    }
  };

  useEffect(() => {
    if (causesSelector.length === 0) {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "https://apis.azzappointments.com/api/v1/causes",
        headers: {
          client_id: "eae55ed2d7291eaf5741f71203eeba44f922",
          auth_token: "B8nMUiyQD68Y2Kiv08PTzfCKRMJIDuKIgXshLJaPY",
        },
      };
      axios
        .request(config)
        .then((response) => {
          /// Causes
          const causeData = response.data.causes;
          const causeFiltered = causeData.map((item) => {
            return item;
          });
          const outputCause = causeFiltered.map((item) => ({
            value: item.id,
            label: item.name,
          }));
          /// Insurance
          const insuranceData = response.data.insurances;
          const insuranceFiltered = insuranceData.map((item) => {
            return item;
          });
          const outputInsurance = insuranceFiltered.map((item) => ({
            value: item.id,
            label: item.name,
          }));
          dispatch(
            addCauses({
              cause: outputCause,
              insurance: outputInsurance,
              addresses: response.data.addresses,
              visit_types: response.data.visit_types,
            })
          );
        })
        .catch((error) => {
          //console.log(error);
        });
    }
    if (causesSelector[0] !== undefined) {
      setCauseOptions(causesSelector[0].cause);
      setInsuranceOptions(causesSelector[0].insurance);
    }
  }, [causesSelector]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Loader ON
    setLoader(true);

    ///*! Adding Patient Cause+Insurance+Mode => patientSlice
    handleAddPatient();

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://apis.azzappointments.com/api/v1/providers?query=${cause}`,
      headers: {
        client_id: "eae55ed2d7291eaf5741f71203eeba44f922",
        auth_token: "B8nMUiyQD68Y2Kiv08PTzfCKRMJIDuKIgXshLJaPY",
      },
    };

    axios
      .request(config)
      .then((response) => {
        dispatch(removeProvidersId());
        dispatch(removeProvidersData());
        dispatch(removeSlotsData());
        dispatch(removeCombinedData());
        dispatch(addProvidersData(response.data));
        dispatch(addProvidersId(response.data.map((item) => item.azz_id)));
        setLoader(false);
        dispatch(addScreen(2));
      })
      .catch((error) => {
        dispatch(removePatient());
      });
  };

  return (
    <>
      <div className="relative w-[100vw] h-[70vh]  overflow-hidden">
        <video
          className="w-full h-full object-cover max-md:h-[70vh] "
          src="/bg.mp4"
          autoPlay
          loop
          muted
        />
        <div className=" top-0 absolute w-full h-full flex items-center justify-center bg-black/10 ">
          <div className="flex flex-col items-center justify-center w-full h-full gap-5 ">
            {loader ? (
              ""
            ) : (
              <div className="flex items-center justify-center px-5 py-10 ">
                <div className="text-5xl max-lg:text-4xl max-sm:text-3xl text-center font-semibold  myclass text-[#1E328F]">
                  Book a local
                  <span className="mx-[10px] text-white font-bold myclass1 ">
                    <TextTransition
                      inline={true}
                      springConfig={presets.default}
                    >
                      {TEXTS[index % TEXTS.length]}
                    </TextTransition>
                  </span>
                  who takes your insurance
                </div>
              </div>
            )}
            <form
              onSubmit={handleSubmit}
              className="relative flex items-center justify-center gap-5 max-[1150px]:flex-col"
            >
              {loader && (
                <div className="flex items-center justify-center py-20">
                  <span className="loading-lg loading loading-bars bg-[#1E328F]"></span>
                </div>
              )}
              {loader ? (
                ""
              ) : (
                <Select
                  placeholder="Condition or Procedure..."
                  required
                  components={{ DropdownIndicator: CauseIndicator }}
                  className="shadow-lg hover:shadow-xl focus:shadow-xl"
                  onChange={(Choice) => setCause(Choice.label)}
                  noOptionsMessage={() => "Not Found"}
                  options={causeOptions}
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      width: 310,
                      height: 50,
                      border: "2px solid #1E328F",
                      "&:hover": {
                        border: "2px solid #1E328F",
                        cursor: "pointer",
                      },
                    }),
                    menuList: (baseStyles, state) => ({
                      ...baseStyles,
                      "&:hover": { cursor: "pointer" },
                      maxHeight: "160px",
                    }),
                    dropdownIndicator: (baseStyles, state) => ({
                      ...baseStyles,
                      color: "#1E328F",
                    }),
                    option: (baseStyles, state) => ({
                      ...baseStyles,
                      backgroundColor: state.isSelected
                        ? "rgba(13,50,118,1)"
                        : "white",
                      "&:hover": {
                        backgroundColor: "#1E328F",
                        cursor: "pointer",
                        color: "white",
                      },
                    }),
                  }}
                />
              )}

              {loader ? (
                ""
              ) : (
                <Creatable
                  components={{ DropdownIndicator: InsuranceIndicator }}
                  className="shadow-lg hover:shadow-xl focus:shadow-xl"
                  onChange={(Choice) => setInsurance(Choice.value)}
                  noOptionsMessage={() => "Not Found"}
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      width: 310,
                      height: 50,
                      border: "2px solid #1E328F",
                      "&:hover": {
                        border: "2px solid #1E328F",
                        cursor: "pointer",
                      },
                    }),
                    menuList: (baseStyles, state) => ({
                      ...baseStyles,
                      "&:hover": { cursor: "pointer" },
                      maxHeight: "160px",
                    }),
                    menuPortal: (baseStyles, state) => ({
                      ...baseStyles,
                      "&:hover": { backgroundColor: "red" },
                    }),
                    dropdownIndicator: (baseStyles, state) => ({
                      ...baseStyles,
                      color: "#1E328F",
                    }),
                    option: (baseStyles, state) => ({
                      ...baseStyles,
                      backgroundColor: state.isSelected
                        ? "rgba(13,50,118,1)"
                        : "white",
                      "&:hover": {
                        backgroundColor: "rgba(13,50,118,1)",
                        cursor: "pointer",
                        color: "white",
                      },
                    }),
                  }}
                  placeholder="Choose or write your insurance"
                  options={insuranceOptions}
                  createOptionPosition="first"
                />
              )}
              {loader ? (
                ""
              ) : (
                <Select
                  components={{ DropdownIndicator: ModeIndicator }}
                  className="shadow-lg hover:shadow-xl focus:shadow-xl"
                  required
                  onChange={(Choice) => setMode(Choice.value)}
                  noOptionsMessage={() => "Not Found"}
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      width: 310,
                      height: 50,
                      border: "2px solid #1E328F",
                      "&:hover": {
                        border: "2px solid #1E328F",
                        cursor: "pointer",
                      },
                    }),
                    menuList: (baseStyles, state) => ({
                      ...baseStyles,
                      "&:hover": { cursor: "pointer" },
                      maxHeight: "160px",
                    }),
                    dropdownIndicator: (baseStyles, state) => ({
                      ...baseStyles,
                      color: "#1E328F",
                    }),
                    option: (baseStyles, state) => ({
                      ...baseStyles,
                      backgroundColor: state.isSelected
                        ? "rgba(13,50,118,1)"
                        : "white",
                      "&:hover": {
                        backgroundColor: "rgba(13,50,118,1)",
                        cursor: "pointer",
                        color: "white",
                      },
                    }),
                  }}
                  placeholder="Mode of Consultancy"
                  options={modeOptions}
                  defaultValue={{
                    value: "Office Appointment",
                    label: "Office Appointment",
                  }}
                />
              )}
              {loader ? (
                ""
              ) : (
                <button
                  type="submit"
                  className="btn btn-primary text-lg font-semibold px-4 py-[9px] rounded shadow-lg hover:shadow-xl focus:shadow-xl max-[1150px]:px-[115px]"
                >
                  Find Care
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
      {/* <div className="relative">
        <div className="flex flex-col items-center justify-center w-full h-auto gap-5">
          {loader ? (
            ""
          ) : (
            <div className="flex items-center justify-center px-5 py-10">
              <div className="text-5xl max-lg:text-4xl max-sm:text-3xl text-center font-semibold text-[#1E328F]">
                Book a local
                <span className="mx-[10px] text-[#921D21] font-bold">
                  <TextTransition inline={true} springConfig={presets.default}>
                    {TEXTS[index % TEXTS.length]}
                  </TextTransition>
                </span>
                who takes your insurance
              </div>
            </div>
          )}
          <form
            onSubmit={handleSubmit}
            className="relative flex items-center justify-center gap-5 max-[1150px]:flex-col"
          >
            {loader && (
              <div className="flex items-center justify-center py-20">
                <span className="loading-lg loading loading-bars bg-[#1E328F]"></span>
              </div>
            )}
            {loader ? (
              ""
            ) : (
              <Select
                placeholder="Condition or Procedure..."
                required
                components={{ DropdownIndicator: CauseIndicator }}
                className="shadow-lg hover:shadow-xl focus:shadow-xl"
                onChange={(Choice) => setCause(Choice.label)}
                noOptionsMessage={() => "Not Found"}
                options={causeOptions}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    width: 310,
                    height: 50,
                    border: "2px solid #1E328F",
                    "&:hover": {
                      border: "2px solid #1E328F",
                      cursor: "pointer",
                    },
                  }),
                  menuList: (baseStyles, state) => ({
                    ...baseStyles,
                    "&:hover": { cursor: "pointer" },
                    maxHeight: "200px",
                  }),
                  dropdownIndicator: (baseStyles, state) => ({
                    ...baseStyles,
                    color: "#1E328F",
                  }),
                  option: (baseStyles, state) => ({
                    ...baseStyles,
                    backgroundColor: state.isSelected
                      ? "rgba(13,50,118,1)"
                      : "white",
                    "&:hover": {
                      backgroundColor: "#1E328F",
                      cursor: "pointer",
                      color: "white",
                    },
                  }),
                }}
              />
            )}

            {loader ? (
              ""
            ) : (
              <Select
                components={{ DropdownIndicator: InsuranceIndicator }}
                className="shadow-lg hover:shadow-xl focus:shadow-xl"
                onChange={(Choice) => setInsurance(Choice.value)}
                noOptionsMessage={() => "Not Found"}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    width: 310,
                    height: 50,
                    border: "2px solid #1E328F",
                    "&:hover": {
                      border: "2px solid #1E328F",
                      cursor: "pointer",
                    },
                  }),
                  menuList: (baseStyles, state) => ({
                    ...baseStyles,
                    "&:hover": { cursor: "pointer" },
                    maxHeight: "200px",
                  }),
                  menuPortal: (baseStyles, state) => ({
                    ...baseStyles,
                    "&:hover": { backgroundColor: "red" },
                  }),
                  dropdownIndicator: (baseStyles, state) => ({
                    ...baseStyles,
                    color: "#1E328F",
                  }),
                  option: (baseStyles, state) => ({
                    ...baseStyles,
                    backgroundColor: state.isSelected
                      ? "rgba(13,50,118,1)"
                      : "white",
                    "&:hover": {
                      backgroundColor: "rgba(13,50,118,1)",
                      cursor: "pointer",
                      color: "white",
                    },
                  }),
                }}
                placeholder="Choose insurance"
                options={insuranceOptions}
              />
            )}
            {loader ? (
              ""
            ) : (
              <Select
                components={{ DropdownIndicator: ModeIndicator }}
                className="shadow-lg hover:shadow-xl focus:shadow-xl"
                required
                onChange={(Choice) => setMode(Choice.value)}
                noOptionsMessage={() => "Not Found"}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    width: 310,
                    height: 50,
                    border: "2px solid #1E328F",
                    "&:hover": {
                      border: "2px solid #1E328F",
                      cursor: "pointer",
                    },
                  }),
                  menuList: (baseStyles, state) => ({
                    ...baseStyles,
                    "&:hover": { cursor: "pointer" },
                    maxHeight: "200px",
                  }),
                  dropdownIndicator: (baseStyles, state) => ({
                    ...baseStyles,
                    color: "#1E328F",
                  }),
                  option: (baseStyles, state) => ({
                    ...baseStyles,
                    backgroundColor: state.isSelected
                      ? "rgba(13,50,118,1)"
                      : "white",
                    "&:hover": {
                      backgroundColor: "rgba(13,50,118,1)",
                      cursor: "pointer",
                      color: "white",
                    },
                  }),
                }}
                placeholder="Mode of Consultancy"
                options={modeOptions}
                defaultValue={{
                  value: "Office Appointment",
                  label: "Office Appointment",
                }}
              />
            )}
            {loader ? (
              ""
            ) : (
              <button
                type="submit"
                className="btn btn-primary text-lg font-semibold px-4 py-[9px] rounded shadow-lg hover:shadow-xl focus:shadow-xl max-[1150px]:px-[115px]"
              >
                Find Care
              </button>
            )}
          </form>
        </div>
      </div> */}
    </>
  );
};

export default Home;
