"use client";
import { Input } from "@/components/ui/input";
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  useForm,
  Controller,
  SubmitHandler,
  UseFormClearErrors,
  Control,
} from "react-hook-form";
import DatePicker from "./datepicker";
const JobFormDriver = ({
  register,
  required,
  children,
  errors,
  selectedDateValue,
  setCustomValue,
  setError,
  clearErrors,
  control,
  Controller,
}: {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  required?: boolean;
  children: React.ReactNode;
  selectedDateValue: Date;
  setCustomValue: (id: string, value: any) => void;
  setError: (id: string, value: any) => void;
  control: Control<FieldValues>;
  clearErrors: UseFormClearErrors<FieldValues>;
  Controller: React.ComponentType<any>;
}) => {
  return (
    <div className=" flex flex-col gap-5">
      <Input
        id="job_name"
        type="string"
        placeholder="Job Name"
        className={`
          ${errors["job_name"] ? "border-rose-500" : "border-neutral-300"}
          ${errors["job_name"] ? "focus:border-rose-500" : "focus:border-black"}
        `}
        {...register("job_name", { required })}
      />
      <div className="w-full">{children}</div>
      <DatePicker
        register={register}
        errors={errors}
        required={true}
        setCustomValue={setCustomValue}
        setError={setError}
        selectedDateValue={selectedDateValue}
        control={control}
        Controller={Controller}
        clearErrors={clearErrors}
      />
    </div>
  );
};

export default JobFormDriver;
