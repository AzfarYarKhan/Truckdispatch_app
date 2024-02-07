"use client";

import * as React from "react";
import { useEffect } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormWatch,
  useForm,
  Controller,
  Control,
  UseFormClearErrors,
} from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const DatePicker = ({
  register,
  errors,
  required,
  setCustomValue,
  selectedDateValue,
  setError,
  control,
  Controller,
  clearErrors,
}: {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  required?: boolean;
  selectedDateValue: Date;
  setCustomValue: (id: string, value: any) => void;
  setError: (id: string, value: any) => void;
  Controller: React.ComponentType<any>;
  control: Control<FieldValues>;
  clearErrors: UseFormClearErrors<FieldValues>;
}) => {
  const [date, setDate] = React.useState<Date>();

  useEffect(() => {
    if (
      selectedDateValue instanceof Date &&
      !isNaN(selectedDateValue.getTime())
    ) {
      setDate(selectedDateValue);
    }
  }, []);

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
      setCustomValue("date", newDate);
    }
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={`
          w-full rounded-md border border-gray-300 justify-start text-left font-normal 
          ${!date ? "text-muted-foreground" : ""}
          ${errors["date"] ? "border-rose-500" : "border-neutral-300"}
        `}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Controller
          control={control}
          name="date"
          rules={{
            required: true,
            validate: (value) => {
              console.log("Validation Result:", value);
              return true;
            },
          }}
          render={({ field }) => (
            <Calendar
              mode="single"
              selected={date}
              onSelect={(day: Date | undefined) => {
                handleDateChange(day);
                field.onChange(day);
              }}
              initialFocus
            />
          )}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
