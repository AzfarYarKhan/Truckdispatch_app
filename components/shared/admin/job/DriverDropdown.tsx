"use client";

import { FC } from "react";
import { useForm } from "react-hook-form";
import { User, Driver } from "@prisma/client";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { useState, ChangeEvent, useEffect } from "react";
import { RiArrowDropDownFill } from "react-icons/ri";

interface DriverDropdownProps {
  drivers: (Driver & {
    user: User;
  })[];
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  required: boolean;
  onSelect: (value: string) => void;
  Selected: string;
}

const DriverDropdown: FC<DriverDropdownProps> = ({
  drivers,
  register,
  errors,
  required,
  onSelect,
  Selected,
}) => {
  return (
    <div className="relative inline-block w-full">
      <select
        {...register("driver_id", { required })}
        value={Selected}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
          onSelect(e.target.value);
          const selectedValue = e.target.value;
          const selectedDriver = drivers.find(
            (driver) => driver.id === selectedValue
          );
          const selectedDriverName = selectedDriver?.user.name;
          localStorage.setItem("selectedDriverId", selectedValue);
          localStorage.setItem("selectedDriverName", selectedDriverName || "");
        }}
        className={`w-full py-2 px-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:border-black focus:ring-offset-2 focus:ring-2 focus:ring-black
        ${errors["driver_id"] ? "border-rose-500" : "border-neutral-300"}
        ${errors["driver_id"] ? "focus:border-rose-500" : "focus:border-black"}
      `}
      >
        {localStorage.getItem("selectedDriverId") ? (
          <option
            key={localStorage.getItem("selectedDriverId")}
            value={localStorage.getItem("selectedDriverId")}
            disabled
            className="text-gray-500 mt-1 mb-1"
          >
            {localStorage.getItem("selectedDriverName")}
          </option>
        ) : (
          <option key="" value="" disabled className="text-gray-500 mt-1 mb-1">
            Select Driver
          </option>
        )}

        {drivers.map((driver) => (
          <option key={driver.id} value={driver.id} className="text-black">
            {driver.user.name}
          </option>
        ))}
      </select>
      <div className="absolute top-0 right-0 bottom-0 flex items-center pr-3 pointer-events-none">
        <div className="h-5 w-5">
          <RiArrowDropDownFill />
        </div>
      </div>
    </div>
  );
};

export default DriverDropdown;
