"use client";

import { useCallback, useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import JobForm from "./JobForm";
import JobFormDriver from "./JobFormDriver";
import DriverDropdownprovider from "./DriverDropdownprovider";
import LocationInput from "@/components/shared/admin/job/LocationInput";
import Loadingspinner from "@/components/shared/admin/job/loadingspinner";
import { createJob } from "@/app/actions/job.actions";
import { sendSMS } from "@/app/actions/job.actions";
import dynamic from "next/dynamic";
import { useMutation } from "react-query";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FieldValues,
  SubmitHandler,
  useForm,
  Controller,
} from "react-hook-form";
import { useRouter } from "next/navigation";
import { string } from "zod";

enum STEPS {
  DRIVER = 0,
  CONFIRM = 1,
}

function JobModal() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(STEPS.DRIVER);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
    reset,
    setError,
    clearErrors,
  } = useForm<FieldValues>({
    defaultValues: {
      driver_id: "",
      job_name: "",
      date: null || Date,
      pickup_location: { lat: 0, lon: 0 },
      dropoff_location: { lat: 0, lon: 0 },
      pickup_location_name: "",
      dropoff_location_name: "",
      distance: 0,
    },
  });

  const driver_id: string = watch("driver_id");
  const job_name = watch("job_name");
  const date = watch("date");
  const pickup_location = watch("pickup_location");
  const dropoff_location = watch("dropoff_location");
  const pickup_location_name = watch("pickup_location_name");
  const dropoff_location_name = watch("dropoff_location_name");
  const distance = watch("distance");

  const isLocationsValid =
    pickup_location?.lat !== 0 &&
    pickup_location?.lon !== 0 &&
    dropoff_location?.lat !== 0 &&
    dropoff_location?.lon !== 0;

  const Map = useMemo(
    () =>
      dynamic(() => import("./MapComponent"), {
        ssr: false,
      }),
    [pickup_location, dropoff_location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };
  const onNext = () => {
    setStep((value) => value + 1);
  };
  const createJobMutation = useMutation(createJob, {
    onSuccess: () => {
      toast.success("Job created!");
      router.refresh();
      setLoading(false);
    },
    onError: (error) => {
      console.error("Error creating job:", error);
      toast.error("Failed to create job. Please try again.");
      setLoading(false);
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (step !== STEPS.CONFIRM) {
      if (!data.date || typeof data.date === "function") {
        console.log("setting error");
        setError("date", {
          type: "manual",
          message: "Date is required.",
        });
        return;
      }
      return onNext();
    } else {
      console.log(data);
      localStorage.clear();
      setStep(STEPS.DRIVER);
      reset();
      setLoading(true);
      const driver_id = data.driver_id;
      // await sendSMS(driver_id);
      createJobMutation.mutate(data);
      try {
        console.log("Sending SMS to driver:", driver_id);
        await sendSMS(driver_id);
      } catch (error) {
        console.error("Failed to send SMS:", error);
        setLoading(false);
        toast.error("Failed to send SMS. Please try again.");
        return;
      }
      router.refresh();
      setLoading(false);
      toast.success("Job created!");
    }
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.CONFIRM) {
      return "Confirm";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.DRIVER) {
      return undefined;
    }

    return "Back";
  }, [step]);

  let bodyContent = (
    <div>
      <JobFormDriver
        register={register}
        errors={errors}
        required
        setCustomValue={setCustomValue}
        setError={setError}
        selectedDateValue={date}
        control={control}
        Controller={Controller}
        clearErrors={clearErrors}
      >
        <DriverDropdownprovider
          register={register}
          errors={errors}
          required
          setCustomValue={setCustomValue}
          selectedValue={driver_id}
        />
      </JobFormDriver>
    </div>
  );

  if (step === STEPS.CONFIRM) {
    const locations = [
      {
        name: "Pickup Location",
        lat: pickup_location?.lat,
        lon: pickup_location?.lon,
      },
      {
        name: "Dropoff Location",
        lat: dropoff_location?.lat,
        lon: dropoff_location?.lon,
      },
    ];
    const handlePickupChange = (lon: number, lat: number, name: string) => {
      setCustomValue("pickup_location", { lon, lat });
      setCustomValue("pickup_location_name", name);
    };

    const handleDropoffChange = (lon: number, lat: number, name: string) => {
      setCustomValue("dropoff_location", { lon, lat });
      setCustomValue("dropoff_location_name", name);
    };
    const setCalculatedDistance = (distance: number) => {
      setCustomValue("distance", distance);
    };
    bodyContent = (
      <div className="flex flex-col gap-3">
        <LocationInput onChange={handlePickupChange} />
        <LocationInput onChange={handleDropoffChange} />
        <div className="mt-5">
          <Map locations={locations} setDistance={setCalculatedDistance} />
        </div>
      </div>
    );
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-gray-900 hover:bg-gray-800 text-white hover:text-slate-50"
        >
          Create Job
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] min-h-[600px] ">
        {loading ? (
          <Loadingspinner />
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Create Job</DialogTitle>
            </DialogHeader>
            <JobForm
              onSubmit={handleSubmit(onSubmit)}
              disabled={!isLocationsValid && step === STEPS.CONFIRM}
              actionLabel={actionLabel}
              secondaryActionLabel={secondaryActionLabel}
              secondaryAction={step === STEPS.DRIVER ? undefined : onBack}
              body={bodyContent}
            />
          </>
        )}
      </DialogContent>

      <ToastContainer />
    </Dialog>
  );
}

export default JobModal;
