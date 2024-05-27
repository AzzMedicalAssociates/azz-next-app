"use client";
import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const center = {
  lat: 36.30059,
  lng: -85.6918,
};

const Map1 = () => {
  const mapSelector = useSelector((state) => state.map)[0];

  // const markers = mapSelector && mapSelector;

  // const groupedProviders =
  //   markers &&
  //   markers.reduce((acc, current) => {
  //     const address = current.geoCode[0].formatted_address;
  //     const location = JSON.stringify(current.geoCode[0].geometry.location);
  //     const key = `${address}_${location}`; // Combine address and location to create a unique key

  //     if (!acc[key]) {
  //       acc[key] = { address, location: JSON.parse(location), providers: [] }; // Initialize providers as an array
  //     }
  //     acc[key].providers.push({ ...current }); // Push into the providers array

  //     return acc;
  //   }, {});

  // console.log(groupedProviders && groupedProviders);

  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: googleMapsApiKey,
  });

  const [map, setMap] = React.useState(0);
  const [selectedMarker, setSelectedMarker] = React.useState("");
  const [selectedProvider, setSelectedProvider] = React.useState(0);

  const onLoad = React.useCallback(
    function callback(map) {
      //const bounds = new window.google.maps.LatLngBounds(center);
      map.setZoom(1);
      setMap(map);
    },
    [center]
  );

  const onUnmount = React.useCallback(
    function callback(map) {
      map.setZoom(1);
      setMap(map);
    },
    [center]
  );

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const handleNextProvider = () => {
    const providers = groupedProviders[selectedMarker].providers;
    setSelectedProvider(
      (prevProvider) => (prevProvider + 1) % providers.length
    );
  };

  const handlePrevProvider = () => {
    const providers = groupedProviders[selectedMarker].providers;
    setSelectedProvider(
      (prevProvider) => (prevProvider - 1 + providers.length) % providers.length
    );
  };

  return isLoaded ? (
    <div className="w-full h-full static ">
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          minHeight: "85vh",
        }}
        center={center}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          gestureHandling: "greedy",
          zoom: 5.3,
          minZoom: 5.0,
          maxZoom: 20,
        }}
      >
        {/* {groupedProviders &&
          Object.keys(groupedProviders).map((address) => {
            const location = groupedProviders[address].location;
            return (
              <Marker
                onClick={() => handleMarkerClick(address)}
                position={location}
                key={address}
                className="absolute z-1 cursor-pointer"
              >
                {selectedMarker === address && (
                  <InfoWindow
                    position={location}
                    onCloseClick={() => setSelectedMarker("")}
                    options={{
                      pixelOffset: new window.google.maps.Size(0, -1),
                      maxWidth: 250,
                      maxHeight: 200,
                      ariaLabel: "Provider Info",
                    }}
                  >
                    <div
                      className="flex flex-col gap-2 items-center justify-center overflow-hidden w-40"
                      style={{
                        padding: "10px",
                        backgroundColor: "white",
                        borderRadius: "10px",
                        boxShadow: "0 2px 7px 1px rgba(0,0,0,0.3)",
                        overflowY: "hidden",
                        overflowX: "hidden",
                      }}
                    >
                      <h3
                        style={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          marginBottom: "5px",
                        }}
                      >
                        {
                          groupedProviders[selectedMarker].providers[
                            selectedProvider
                          ].name
                        }
                      </h3>
                      <p
                        style={{
                          fontSize: "14px",
                          marginBottom: "10px",
                        }}
                      >
                        {
                          groupedProviders[selectedMarker].providers[
                            selectedProvider
                          ].description
                        }
                      </p>
                      {groupedProviders[selectedMarker].providers.length >
                        1 && (
                        <div className="flex gap-2">
                          <button
                            onClick={handlePrevProvider}
                            style={{
                              padding: "5px 10px",
                              backgroundColor: "#4CAF50",
                              color: "white",
                              borderRadius: "5px",
                              cursor: "pointer",
                            }}
                          >
                            Prev
                          </button>
                          <button
                            onClick={handleNextProvider}
                            style={{
                              padding: "5px 10px",
                              backgroundColor: "#4CAF50",
                              color: "white",
                              borderRadius: "5px",
                              cursor: "pointer",
                            }}
                          >
                            Next
                          </button>
                        </div>
                      )}
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            );
          })} */}

        {/* {selectedMarker && selectedMarker.id === item.id && (
                    <InfoWindow
                      position={location}
                      onCloseClick={() => setSelectedMarker(null)}
                      options={{
                        pixelOffset: new window.google.maps.Size(0, -1),
                        maxWidth: 250,
                        maxHeight: 200,
                        ariaLabel: "Provider Info",
                      }}
                    >
                      <div className=" flex flex-col items-center justify-center  w-[200px] h-fit text-center text-balance gap-2 pt-2 pb-4 pr-2">
                        <div>{item.address}</div>
                      </div>
                    </InfoWindow>
                  )} */}
      </GoogleMap>
    </div>
  ) : (
    <span className="loading bg-[#1E328F] loading-bars loading-lg"></span>
  );
};

export default React.memo(Map1);
