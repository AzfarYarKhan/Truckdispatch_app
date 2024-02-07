"use client";

import React, { useState } from "react";
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";
import { HiLocationMarker } from "react-icons/hi";

interface LocationInputProps {
  onChange: (lon: number, lat: number, name: string) => void;
}

const LocationInput: React.FC<LocationInputProps> = ({ onChange }) => {
  function onPlaceSelect(value: GeoJSON.Feature) {
    if (value.geometry.type === "Point") {
      const lon = value.geometry.coordinates[0];
      const lat = value.geometry.coordinates[1];
      const name1 = value.properties?.address_line1 || "";
      const name2 = value.properties?.address_line2 || "";
      const name = `${name1} ${name2}`;
      onChange(lon, lat, name);
    } else {
      console.warn("Unsupported geometry type:", value.geometry.type);
    }
  }

  function onSuggestionChange(value: GeoJSON.Feature) {
    //console.log(value);
  }

  return (
    <div className="flex items-center gap-3 w-full">
      <HiLocationMarker className="text-black text-3xl" />
      <GeoapifyContext apiKey="7d010b4c61ed4b66b7e012a9025a4ea8">
        <div className="w-full">
          <div className="relative">
            <GeoapifyGeocoderAutocomplete
              placeholder="Enter address here"
              value="Enter Location"
              placeSelect={onPlaceSelect}
              suggestionsChange={onSuggestionChange}
            />
          </div>
        </div>
      </GeoapifyContext>
    </div>
  );
};

export default LocationInput;
