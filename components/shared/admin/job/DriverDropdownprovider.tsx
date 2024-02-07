"use client";
import React, { useEffect, useState } from "react";
import { getDrivers } from "@/app/actions/getdrivers";
import DriverDropdown from "./DriverDropdown";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { User, Driver } from "@prisma/client";

interface DriverDropdownproviderProps {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  required: boolean;
  setCustomValue: (id: string, value: any) => void;
  selectedValue: string;
}

const DriverDropdownprovider: React.FC<DriverDropdownproviderProps> = ({
  register,
  errors,
  required,
  setCustomValue,
  selectedValue,
}) => {
  const [drivers, setDrivers] = useState<(Driver & { user: User })[]>([]);

  useEffect(() => {
    const fetchDriversData = async () => {
      try {
        const fetchedDrivers = await getDrivers();
        setDrivers(fetchedDrivers);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    };

    fetchDriversData();
  }, []);

  return (
    <DriverDropdown
      drivers={drivers}
      register={register}
      errors={errors}
      required={required}
      onSelect={(id) => setCustomValue("driver_id", id)}
      Selected={selectedValue}
    />
  );
};

export default DriverDropdownprovider;
