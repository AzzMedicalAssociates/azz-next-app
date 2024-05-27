"use client";
import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  MarkerClustererF,
  InfoWindow,
} from "@react-google-maps/api";

import { useSelector } from "react-redux";

const center = {
  lat: 36.30059,
  lng: -85.6918,
};

// const markers = [
//   {
//     location: {
//       lat: 40.21017,
//       lng: -74.6918,
//     },
//     title: "Hamilton Township NJ",
//     label: "A",
//     infoWindow: {
//       name: "Hamilton Township",
//       content: "NJ",
//     },
//   },
//   {
//     location: {
//       lat: 40.246559,
//       lng: -74.774643,
//     },
//     title: "Ewing Township NJ",
//     label: "B",
//     infoWindow: {
//       name: "Ewing Township",
//       content: "NJ",
//     },
//   },
//   {
//     location: {
//       lat: 40.08181,
//       lng: -74.14702,
//     },
//     title: "Brick Township NJ",
//     label: "C",
//     infoWindow: {
//       name: "Brick Township",
//       content: "NJ",
//     },
//   },
//   {
//     location: {
//       lat: 40.39021,
//       lng: -74.309,
//     },
//     title: "Old Bridge NJ",
//     label: "D",
//     infoWindow: {
//       name: "Old Bridge",
//       content: "NJ",
//     },
//   },
//   {
//     location: {
//       lat: 39.73241,
//       lng: -75.06354,
//     },
//     title: "Sewell NJ",
//     label: "E",
//     infoWindow: {
//       name: "Sewell",
//       content: "NJ",
//     },
//   },
//   {
//     location: {
//       lat: 29.5803,
//       lng: -95.65259,
//     },
//     title: "Sugar Land TX",
//     label: "F",
//     infoWindow: {
//       name: "Sugar Land",
//       content: "TX",
//     },
//   },
//   {
//     location: {
//       lat: 30.13058,
//       lng: -95.55192,
//     },
//     title: "Tomball TX",
//     label: "G",
//     infoWindow: {
//       name: "Tomball",
//       content: "TX",
//     },
//   },
// ];

const Map = () => {
  const mapSelector = useSelector((state) => state.map)[0];

  console.log(mapSelector && mapSelector);

  const markers = mapSelector && mapSelector;

  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: googleMapsApiKey,
  });

  const [map, setMap] = React.useState(null);
  const [selectedMarker, setSelectedMarker] = React.useState("");

  const onLoad = React.useCallback(
    function callback(map) {
      const bounds = new window.google.maps.LatLngBounds(center);
      map.setZoom(bounds);
      setMap(map);
    },
    [center]
  );

  const onUnmount = React.useCallback(
    function callback(map) {
      map.setZoom(2);
      setMap(null);
    },
    [center]
  );

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
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
          maxZomm: 6.0,
          // mapTypeId: "terrain",
        }}
      >
        <MarkerClustererF>
          {(clusterer) => {
            markers?.map((marker, i) => {
              // console.log("marker", marker)
              return (
                <MarkerF
                  position={marker.geoCode[0].geometry.location}
                  icon={{
                    url: marker.profile,
                    scaledSize: { width: 40, height: 40 },
                  }}
                  key={marker.id}
                  className="abosolute z-1 cursor-pointer"
                  onClick={() =>
                    handleMarkerClick(marker.address.coordinate, i)
                  }
                  clusterer={clusterer}
                />
              );
            });
          }}
        </MarkerClustererF>

        {/* {markers &&
            markers.map((marker) => (
              <MarkerF
                key={marker.id}
                title={marker.name}
                label={marker.label}
                position={marker.geoCode[0].geometry.location}
                onClick={() => handleMarkerClick(marker)}
                options={{}}
                icon={{
                  url: marker.profile,
                  scaledSize: { width: 40, height: 40 },
                }}
              ></MarkerF>
            ))} */}

        {/* {selectedMarker && (
          <InfoWindow
            position={selectedMarker.location}
            onCloseClick={() => setSelectedMarker("")}
          >
            <div className="flex flex-col gap-2 items-center justify-center overflow-hidden w-40">
              <h3>{selectedMarker.infoWindow.name}</h3>
              <p>{selectedMarker.infoWindow.content}</p>
            </div>
          </InfoWindow>
        )} */}
      </GoogleMap>
    </div>
  ) : (
    <span className="loading bg-[#1E328F] loading-bars loading-lg"></span>
  );
};

export default React.memo(Map);
