"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addScreen } from "@/Redux/screenSlice";
import { removePatient } from "@/Redux/patientSlice";
import { removeProvidersId } from "@/Redux/providersIdSlice";
import { addCombinedData, removeCombinedData } from "@/Redux/combinedDataSlice";
import { addSlotsData, removeSlotsData } from "@/Redux/slotsDataSlice";
import axios from "axios";
import { removeProvidersData } from "@/Redux/providersDataSlice";
import { addSelectedProvider } from "@/Redux/selectedProviderSlice";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Screen2 = () => {
  ///*! USE DISPATCH
  const dispatch = useDispatch();

  ///*! USE SELECTORS
  const providersData = useSelector((state) => state.providersData);
  const slotsData = useSelector((state) => state.slotsData);
  const providersId = useSelector((state) => state.providersId[0]);
  const combinedData = useSelector((state) => state.combinedData);
  const myCombinedData = useSelector((state) => state.combinedData[0]);

  const dateStart = new Date();
  const dateEnd = new Date(dateStart);
  dateEnd.setDate(dateStart.getDate() + 13);

  const formattedDateStart = dateStart.toISOString().split("T")[0];
  const formattedDateEnd = dateEnd.toISOString().split("T")[0];

  ///*! TOAST
  const notifyError = () =>
    toast.error("No slots were found.", {
      position: "top-right",
    });

  useEffect(() => {
    if (providersId !== undefined) {
      // Function to make API call for a specific provider ID
      const getSlotsForProvider = async (providerId) => {
        const config = {
          method: "get",
          maxBodyLength: Infinity,
          url: `https://apis.azzappointments.com/api/v1/slots-by-provider?provider_id=${providerId}&start_date=${formattedDateStart}&end_date=${formattedDateEnd}`,
          //  url: `https://apis.azzappointments.com/api/v1/slots-by-provider?provider_id=${providerId}`,
          headers: {
            client_id: "eae55ed2d7291eaf5741f71203eeba44f922",
            auth_token: "B8nMUiyQD68Y2Kiv08PTzfCKRMJIDuKIgXshLJaPY",
          },
        };

        try {
          const response = await axios.request(config);
          return response.data;
        } catch (error) {
          return { providerId, error: error.message };
        }
      };

      // Use map to make API calls for each provider ID
      const apiCalls = providersId.map(getSlotsForProvider);

      // Wait for all API calls to complete
      Promise.all(apiCalls)
        .then((responses) => {
          if (combinedData.length === 0) {
            if (slotsData.length === 0) {
              dispatch(addSlotsData(responses));
              let tempSlotsData = responses;

              //! 2ND Function: /////////////////////////

              if (tempSlotsData !== undefined) {
                const updatedCombinedData = [];

                providersId.forEach((id) => {
                  const providerEntry = providersData[0].find(
                    (provider) => provider.azz_id === id
                  );
                  const slotEntry = tempSlotsData
                    .map((item) => item)
                    .find((slot) => slot.provider_id === id);

                  if (providerEntry && slotEntry && slotEntry.status === "1") {
                    updatedCombinedData.push({
                      providerId: id,
                      providerEntry: providerEntry,
                      slotEntry: slotEntry,
                    });
                  }
                });

                if (combinedData !== undefined) {
                  dispatch(addCombinedData(updatedCombinedData));
                  dispatch(removeProvidersData());
                  dispatch(removeSlotsData());
                }
              }
            }
          }
        })
        .catch((error) => {
          //console.log("Error in one or more API calls:", error);
        });
    }
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-full overflow-hidden shadow-2xl rounded">
      <section className=" bg-white border rounded w-full">
        <div className="flex items-center justify-between w-full px-4 py-4 border-b border-black/20">
          <div
            onClick={() => {
              dispatch(addScreen(1));
              dispatch(removePatient());
              dispatch(removeProvidersId());
              dispatch(removeProvidersData());
              dispatch(removeSlotsData());
              dispatch(removeCombinedData());
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

          {myCombinedData && myCombinedData.length === 0 ? (
            <span className="text-lg font-semibold">No Provider Found</span>
          ) : (
            <h4 className="text-lg font-semibold">
              {myCombinedData && myCombinedData.length === 0
                ? "No Providers Found!"
                : myCombinedData && myCombinedData.length + " Providers"}
            </h4>
          )}
        </div>
        <div className=" rounded overflow-hidden ">
          {providersId.length === 0 ? (
            <div className="flex flex-col items-center justify-center w-svw h-auto py-40  gap-10">
              <div className="text-gray-500 text-xl font-semibold py-10  ">
                No Providers Found. Please try again later.
              </div>
              <button
                onClick={() => {
                  dispatch(addScreen(1));
                  dispatch(removePatient());
                  dispatch(removeProvidersId());
                  dispatch(removeProvidersData());
                  dispatch(removeSlotsData());
                  dispatch(removeCombinedData());
                }}
                className="btn btn-primary px-10 shadow-lg"
              >
                <svg
                  xmlns="https://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <div className="">
              {myCombinedData ? (
                myCombinedData.map((item, index) => (
                  <section
                    key={index}
                    className="hover:bg-black/5 border-b rounded shadow-md hover:shadow-xl  border-[#1E328F]/20 group/name flex items-center justify-center"
                  >
                    <div className="w-full px-4 py-4 flex max-sm:flex-col items-center justify-between ">
                      <div className="flex items-start justify-start max-sm:w-full max-sm:items-center max-sm:justify-center">
                        <div className="w-20 h-20 overflow-hidden rounded-full shadow-md ">
                          {item.providerEntry.profile ? (
                            <Image
                              width={80}
                              height={80}
                              alt={"provider-pic"}
                              className="rounded-full"
                              src={item.providerEntry.profile}
                            />
                          ) : (
                            <div className="rounded-full w-20 h-20 bg-gray-300 flex items-center justify-center">
                              <svg
                                xmlns="https://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1}
                                stroke="currentColor"
                                className="w-20 h-20 text-[#0D3276]"
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

                      <div
                        onClick={
                          item.slotEntry.status === "0"
                            ? notifyError
                            : () => {
                                dispatch(addScreen(3));
                                dispatch(
                                  addSelectedProvider({ id: item.providerId })
                                );
                              }
                        }
                        className="flex flex-col items-start justify-center gap-1 pl-2 max-sm:w-full max-sm:items-center max-sm:justify-center max-sm:mt-2 hover:cursor-pointer max-sm:text-center text-left  w-[60%]"
                      >
                        <div className="font-bold group-hover/name:underline hover:cursor-pointer">
                          {item.providerEntry.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {item.providerEntry.description}
                        </div>
                        <div className="flex items-start justify-start gap-1 mt-2 text-sm text-gray-500 max-sm:items-start ">
                          <span className="mt-0.5">
                            <svg
                              xmlns="https://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
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
                          <span className="text-[12px] line-clamp-2 ">
                            {item.providerEntry.address}
                          </span>
                        </div>
                      </div>

                      <section className="flex flex-col items-start justify-center max-sm:items-center max-sm:justify-center max-sm:mt-5 h-auto min-h-[200px]">
                        {/******************* Slots section *START* *****************/}

                        <div className="flex flex-wrap items-center justify-start gap-1 ml-1 max-sm:-mt-2 max-sm:items-center max-sm:justify-center xl:w-[550px] lg:w-[400px] md:w-[350px] max-sm:w-auto  ">
                          {item.slotEntry.status === "1" ? (
                            <>
                              {item.slotEntry.data.map((item1, index1) => (
                                <div key={index1}>
                                  <section className="flex flex-wrap items-start justify-start ">
                                    <div>
                                      <div className="flex flex-wrap gap-1">
                                        <div
                                          onClick={
                                            item.slotEntry.status === "0"
                                              ? null
                                              : () => {
                                                  dispatch(addScreen(3));
                                                  dispatch(
                                                    addSelectedProvider({
                                                      id: item.providerId,
                                                    })
                                                  );
                                                }
                                          }
                                          className="btn btn-primary mr-0.5 mb-0.5 !w-[43px] !h-[73px] p-0 rounded hover:opacity-80 hover:cursor-pointer shadow-xl"
                                        >
                                          <div className="flex flex-col items-start">
                                            <div className="font-semibold text-[12px]">
                                              {(new Date(
                                                item1.date
                                              ).toLocaleDateString([], {
                                                weekday: "short",
                                              }) === "Mon" &&
                                                "Tue") ||
                                                (new Date(
                                                  item1.date
                                                ).toLocaleDateString([], {
                                                  weekday: "short",
                                                }) === "Tue" &&
                                                  "Wed") ||
                                                (new Date(
                                                  item1.date
                                                ).toLocaleDateString([], {
                                                  weekday: "short",
                                                }) === "Wed" &&
                                                  "Thu") ||
                                                (new Date(
                                                  item1.date
                                                ).toLocaleDateString([], {
                                                  weekday: "short",
                                                }) === "Thu" &&
                                                  "Fri") ||
                                                (new Date(
                                                  item1.date
                                                ).toLocaleDateString([], {
                                                  weekday: "short",
                                                }) === "Fri" &&
                                                  "Sat") ||
                                                (new Date(
                                                  item1.date
                                                ).toLocaleDateString([], {
                                                  weekday: "short",
                                                }) === "Sat" &&
                                                  "Sun") ||
                                                (new Date(
                                                  item1.date
                                                ).toLocaleDateString([], {
                                                  weekday: "short",
                                                }) === "Sun" &&
                                                  "Mon")}{" "}
                                            </div>
                                            <div className=" text-[11px] font-normal">
                                              {new Date(
                                                item1.date
                                              ).toLocaleDateString("en-US", {
                                                month: "short",
                                              })}{" "}
                                              {new Date(item1.date).getDate() +
                                                1}{" "}
                                            </div>
                                          </div>
                                          <div className="flex flex-col items-start">
                                            <div className="font-semibold text-[12px]">
                                              {item1.slots_count}
                                            </div>
                                            <div className=" text-[11px] font-normal">
                                              {"appts"}
                                            </div>
                                          </div>
                                        </div>
                                        <dialog
                                          id="my_modal_1"
                                          className="modal"
                                        >
                                          <div className="modal-box">
                                            <h3 className="text-lg font-bold">
                                              {/* {new Date(
                                                            selectedDate
                                                          ).toLocaleDateString(
                                                            "en-US",
                                                            {
                                                              weekday: "short",
                                                            }
                                                          )}{" "}
                                                          {new Date(
                                                            selectedDate
                                                          ).toLocaleDateString(
                                                            "en-US",
                                                            {
                                                              month: "short",
                                                            }
                                                          )}{" "}
                                                          {new Date(
                                                            selectedDate
                                                          ).toLocaleDateString(
                                                            "en-US",
                                                            {
                                                              day: "numeric",
                                                            }
                                                          )} */}
                                            </h3>
                                            <div className="flex items-center justify-center gap-5 py-2 mt-2 text-white ">
                                              <div className="flex flex-wrap items-start justify-center gap-1">
                                                <section>
                                                  <div>
                                                    <div
                                                      onClick={() => {
                                                        document
                                                          .getElementById(
                                                            "my_modal_2"
                                                          )
                                                          .showModal();
                                                      }}
                                                      className="px-2 rounded w-fit hover:cursor-pointer btn btn-primary"
                                                    >
                                                      {/* {new Date(
                                                                          cSlot.start_time
                                                                        ).toLocaleTimeString(
                                                                          "en-US",
                                                                          {
                                                                            hour: "numeric",
                                                                            minute:
                                                                              "numeric",
                                                                            hour12: true,
                                                                          }
                                                                        )} */}
                                                      {"00:00 AM "}
                                                    </div>
                                                    <dialog
                                                      id="my_modal_2"
                                                      className="z-auto text-black modal"
                                                    >
                                                      <div className="modal-box w-[200px] overflow-hidden relative flex items-center justify-center">
                                                        <Button
                                                          className="btn btn-primary"
                                                          onClick={() => {
                                                            document
                                                              .getElementById(
                                                                "my_modal_1"
                                                              )
                                                              .close();
                                                            document
                                                              .getElementById(
                                                                "my_modal_2"
                                                              )
                                                              .close();
                                                          }}
                                                        >
                                                          Confirm
                                                        </Button>
                                                        <div className="modal-action">
                                                          <form
                                                            method="dialog"
                                                            className=""
                                                          >
                                                            <button
                                                              className="absolute top-1 right-4 w-1 !h-0 text-black"
                                                              onClick={() =>
                                                                document
                                                                  .getElementById(
                                                                    "my_modal_1"
                                                                  )
                                                                  .close()
                                                              }
                                                            >
                                                              X
                                                            </button>
                                                          </form>
                                                        </div>
                                                      </div>
                                                    </dialog>
                                                  </div>
                                                </section>
                                              </div>
                                            </div>
                                            <div className="modal-action">
                                              <form method="dialog">
                                                <button className="btn-sm btn btn-primary ">
                                                  Close
                                                </button>
                                              </form>
                                            </div>
                                          </div>
                                        </dialog>
                                      </div>
                                    </div>
                                  </section>
                                </div>
                              ))}
                            </>
                          ) : (
                            <div className=" text-gray-700">
                              {item.slotEntry.message}
                            </div>
                          )}
                          <Toaster />
                        </div>

                        {/******************* Slots section *END* *****************/}
                      </section>

                      {/* <div className="flex items-center justify-center gap-1 w-[350px] px-5">
                                  <span className="loading-md loading loading-bars bg-[#0D3276]"></span>
                                </div> */}
                    </div>
                  </section>
                ))
              ) : (
                <>
                  {providersId.map((item, index) => (
                    //! /////////////////   SKELETON /////////////////////
                    <section
                      key={index}
                      className=" hover:bg-black/5 border-b group/name pt-5 h-[200px]"
                    >
                      <div className="w-full px-4 py-4 flex max-sm:flex-col items-center justify-between   ">
                        <div className="flex items-start justify-start max-sm:w-full max-sm:items-center max-sm:justify-center">
                          <div className="w-20 h-20 overflow-hidden rounded-full ">
                            <div className="w-20 h-20 rounded-full skeleton shrink-0"></div>
                          </div>
                        </div>

                        <div className="flex flex-col items-start justify-start gap-1 pl-2 max-sm:w-full max-sm:items-center max-sm:justify-center max-sm:mt-2  max-sm:text-center  ">
                          <div className="flex flex-col gap-4">
                            <div className="skeleton h-6 w-[400px] max-[760px]:w-[300px]"></div>
                            <div className="skeleton h-4 w-[400px] max-[760px]:w-[300px]"></div>
                            <div className="skeleton h-3 w-[400px] max-[760px]:w-[300px]"></div>
                          </div>
                        </div>

                        <section className="flex flex-col items-start justify-start   max-sm:w-full max-sm:items-center max-sm:justify-center max-sm:mt-5 h-full w-[380px] max-[760px]:w-[340px] ">
                          {/******************* Slots section *START* *****************/}

                          <div className="flex flex-wrap items-start justify-start gap-1 ml-1 max-sm:items-center max-sm:justify-center ">
                            <div>
                              <section className="flex flex-wrap items-start justify-start pl-5">
                                <div>
                                  <div className="flex flex-wrap gap-1">
                                    <div className="skeleton !w-[43px] !h-[73px] rounded p-0"></div>
                                    <div className="skeleton !w-[43px] !h-[73px] rounded p-0"></div>
                                    <div className="skeleton !w-[43px] !h-[73px] rounded p-0"></div>
                                    <div className="skeleton !w-[43px] !h-[73px] rounded p-0"></div>
                                    <div className="skeleton !w-[43px] !h-[73px] rounded p-0"></div>
                                    <div className="skeleton !w-[43px] !h-[73px] rounded p-0"></div>
                                  </div>
                                </div>
                              </section>

                              {/* <div>{"Slots not found!"}</div> */}
                            </div>
                          </div>

                          {/******************* Slots section *END* *****************/}
                        </section>

                        {/* <div className="flex items-center justify-center gap-1 w-[350px] px-5">
                          <span className="loading-md loading loading-bars bg-[#0D3276]"></span>
                        </div> */}
                      </div>
                    </section>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Screen2;
