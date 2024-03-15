"use client";
import React, { useEffect, useState } from "react";
import Select, { components } from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { removeSelectedProvider } from "@/Redux/selectedProviderSlice";
import { addScreen } from "@/Redux/screenSlice";
import { addDateTime } from "@/Redux/dateTimeSlice";
import Image from "next/image";

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
          d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
        />
      </svg>
    </components.DropdownIndicator>
  );
};

const Screen3 = () => {
  const [userSelectedDate, setUserSelectedDate] = useState();
  const [userSelectedTime, setUserSelectedTime] = useState();

  ///*! USE DISPATCH
  const dispatch = useDispatch();

  ///*! USE SELECTORS
  const myCombinedData = useSelector((state) => state.combinedData[0]);

  const selectedProvider = useSelector(
    (state) => state.selectedProvider?.[0]?.id
  );
  const selectedProfile = selectedProvider
    ? myCombinedData.filter((filter) => filter.providerId === selectedProvider)
    : [];

  const locationNames = selectedProfile[0].slotEntry.locations.map(
    (item) => item.name
  );
  const locationIds = selectedProfile[0].slotEntry.locations.map(
    (item) => item.id
  );

  const selectedProviderLocations = [];

  for (let i = 0; i < locationNames.length; i++) {
    selectedProviderLocations.push({
      value: locationIds[i],
      label: locationNames[i],
    });
  }

  const locationOptions = selectedProviderLocations;

  const [selectedLocation, setSelectedLocation] = useState(locationOptions[0]);

  // useEffect(() => {}, [selectedLocation]);

  const handleLocation = (choice) => {
    setSelectedLocation(choice);
  };

  const combinedData = useSelector((state) => state.combinedData);

  const tempSlotsByLocation1 = selectedProfile[0].slotEntry.data.map((item) =>
    item.slots_by_location
      .flatMap((item) => item)
      .filter((filter) => filter.location_name === selectedLocation.label)
  );

  const tempSlotsByLocation2 = tempSlotsByLocation1
    .flatMap((item) => item)
    .flatMap((item) => item.slots);

  const dates = tempSlotsByLocation2.map((item) => item.date);

  const uniqueDates = [...new Set(dates)];

  const allSlotsByLocation = tempSlotsByLocation2;

  console.log(selectedLocation.value);
  // console.log(
  //   allSlotsByLocation.filter((filter) => filter.date === "2024-03-15")
  // );

  return (
    <>
      {selectedProfile &&
        selectedProfile.map((item, index) => (
          <div
            key={index}
            className="flex items-center  justify-center w-svw px-14 h-full overflow-hidden pb-20"
          >
            <section className="bg-white w-full h-full border shadow-2xl rounded">
              <div className="flex items-center justify-between w-full h-full px-4 py-4 bg-white border-b border-black/20">
                <div className="flex items-center justify-center gap-2  ">
                  <div
                    onClick={() => {
                      dispatch(removeSelectedProvider());
                      dispatch(addScreen(2));
                    }}
                    className="p-2 text-white rounded btn btn-primary hover:cursor-pointer"
                  >
                    <svg
                      xmlns="https://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5L8.25 12l7.5-7.5"
                      />
                    </svg>
                  </div>
                </div>

                <h4 className="text-lg font-semibold">Provider Profile</h4>
              </div>
              <div className="rounded w-full  ">
                <section className="flex flex-col items-center w-full h-full  group/name">
                  <div className="flex items-center justify-around w-full py-4 flex-col">
                    <div className="flex items-start justify-start max-sm:w-full max-sm:items-center max-sm:justify-center flex-col">
                      <div className="w-[100px] h-[100px] overflow-hidden rounded-full shadow-md">
                        {item.providerEntry.profile ? (
                          <Image
                            width={100}
                            height={100}
                            alt={"provider-pic"}
                            className="rounded-full"
                            src={item.providerEntry.profile}
                          />
                        ) : (
                          <div className="rounded-full w-24 h-24 bg-gray-300 flex items-center justify-center">
                            <svg
                              xmlns="https://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1}
                              stroke="currentColor"
                              className="w-full h-full rounded-full text-[#0D3276]"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-1 pl-2 max-sm:w-full mt-2 ">
                      <div className="font-bold ">
                        {item.providerEntry.name}
                      </div>
                      <div className="text-sm text-gray-500 ">
                        {item.providerEntry.description}
                      </div>
                      <div className="flex items-start gap-1 mt-2 text-sm text-gray-500 max-sm:items-center max-sm:justify-center">
                        <span className="mt-0.5">
                          <svg
                            xmlns="https://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4 stroke-[#0D3276]"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                            />
                          </svg>
                        </span>
                        <span className="text-[12px]">
                          {item.providerEntry.address}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <section className="flex flex-col items-center justify-center gap-5 py-5 ">
                      {locationOptions.length > 1 ? (
                        <div>
                          <div>Select the location:</div>
                          <Select
                            defaultValue={selectedLocation}
                            components={{ DropdownIndicator: ModeIndicator }}
                            className="shadow-lg hover:shadow-xl focus:shadow-xl"
                            required
                            onChange={(choice) => {
                              handleLocation(choice);
                            }}
                            noOptionsMessage={() => "Not Found"}
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,
                                width: 350,
                                height: 50,
                                border: "2px solid #0D3276",
                                "&:hover": {
                                  border: "2px solid #0D3276",
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
                                color: "#0D3276",
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
                            options={locationOptions}
                          />
                        </div>
                      ) : (
                        <>
                          <div>
                            Location:{" "}
                            <span className=" font-medium">
                              {locationOptions[0].label}
                            </span>
                          </div>
                        </>
                      )}
                      <section className="flex flex-col items-center justify-center max-sm:mt-5 h-full w-full ">
                        {/******************* Slots section *START* *****************/}

                        <div className="w-full flex flex-col items-center justify-center ">
                          {uniqueDates.map((item, index) => (
                            <div
                              key={index}
                              className="w-full flex flex-col pl-5 pr-3 py-2 my-2 border rounded"
                            >
                              <div className="text-[#1E328F] font-semibold    ">
                                {new Date(item).toLocaleDateString([], {
                                  weekday: "long",
                                  day: "numeric",
                                  month: "short",
                                })}
                              </div>
                              <div className="grid grid-cols-5 max-lg:grid-cols-5 max-md:grid-cols-4 max-sm:grid-cols-3 py-3 ">
                                {allSlotsByLocation
                                  .filter((filter) => filter.date === item)
                                  .map((slot, index1) => (
                                    <div key={index1}>
                                      {/* Render slot information here */}

                                      <div
                                        className={
                                          slot.booked
                                            ? "uppercase !px-0 rounded w-24 btn hover:cursor-not-allowed mr-2 mb-2"
                                            : "uppercase !px-0 rounded w-24 hover:cursor-pointer btn btn-primary mr-2 mb-2"
                                        }
                                        onClick={
                                          slot.booked
                                            ? null
                                            : () => {
                                                document
                                                  .getElementById("my_modal_2")
                                                  .showModal();
                                                setUserSelectedTime(
                                                  new Date(
                                                    slot.start_time
                                                  ).toLocaleTimeString(
                                                    "en-US",
                                                    {
                                                      hour: "numeric",
                                                      minute: "numeric",
                                                      hour12: true,
                                                    }
                                                  )
                                                );
                                                setUserSelectedDate(slot.date);
                                              }
                                        }
                                      >
                                        {console.log(slot)}
                                        {slot &&
                                          new Date(
                                            slot.start_time
                                          ).toLocaleTimeString([], {
                                            hour: "numeric",
                                            minute: "numeric",
                                            hour12: true,
                                          })}
                                      </div>
                                      <dialog
                                        id="my_modal_2"
                                        className="z-auto text-black modal"
                                      >
                                        <div className="relative flex items-center justify-center w-1/2 overflow-hidden modal-box h-[150px]">
                                          <h4 className="absolute font-bold top-3 text-md">
                                            {new Date(
                                              userSelectedDate
                                            ).toLocaleDateString("en-US", {
                                              weekday: "long",
                                            })}{" "}
                                            {new Date(
                                              userSelectedDate
                                            ).toLocaleDateString("en-US", {
                                              month: "short",
                                            })}{" "}
                                            {new Date(
                                              userSelectedDate
                                            ).toLocaleDateString("en-US", {
                                              day: "numeric",
                                            })}
                                            {" at "}
                                            {userSelectedTime}
                                          </h4>
                                          <button
                                            className="mt-5 btn px-5 btn-primary "
                                            onClick={() => {
                                              document
                                                .getElementById("my_modal_2")
                                                .close();
                                              dispatch(
                                                addDateTime({
                                                  date: userSelectedDate,
                                                  time: userSelectedTime,
                                                  location: selectedLocation,
                                                })
                                              );
                                              dispatch(addScreen(4));
                                            }}
                                          >
                                            Confirm
                                          </button>
                                          <div className="modal-action">
                                            <form method="dialog" className="">
                                              <button className="absolute btn-sm p-1 text-[12px] btn btn-primary bottom-2 right-2 ">
                                                Close
                                              </button>
                                            </form>
                                          </div>
                                        </div>
                                      </dialog>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/******************* Slots section *END* *****************/}
                      </section>
                    </section>
                  </div>
                </section>
              </div>
            </section>
          </div>
        ))}
    </>
  );
};

export default Screen3;
