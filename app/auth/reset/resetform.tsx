"use client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loading from "./loading";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const FormSchema = z.object({
  usertoken: z.string(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .regex(/[a-zA-Z]/, { message: "Password must contain at least one letter" })
    .regex(/\d/, { message: "Password must contain at least one digit" })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "Password must contain at least one special character",
    }),
  confirmPassword: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .regex(/[a-zA-Z]/, { message: "Password must contain at least one letter" })
    .regex(/\d/, { message: "Password must contain at least one digit" })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "Password must contain at least one special character",
    }),
});

type FormSchemaType = z.infer<typeof FormSchema>;

type ResetPasswordFormProps = {
  usertoken: string;
};

export default function ResetPasswordForm({
  usertoken,
}: ResetPasswordFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });
  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    if (data.password === data.confirmPassword) {
      try {
        setLoading(true);
        const response = await axios.post("/api/resetpassword/", data);
        console.log(response.data);
        if (response.data.message === "Password updated successfully.") {
          toast.success("Password updated successfully.");
          router.push("/");
        }
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    } else {
      toast.error("Passwords donot match");
    }
  };
  const isButtonDisabled =
    watch("password") !== watch("confirmPassword") &&
    !!watch("confirmPassword");

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div
          className="w-screen h-screen flex justify-center items-center
        bg-zinc-900"
        >
          <form
            className="p-10 bg-white rounded-xl drop-shadow-lg space-y-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="font-inter text-center text-3xl font-medium">
              Update Password
            </h1>
            <input
              type="hidden"
              id="usertoken"
              value={usertoken}
              {...register("usertoken")}
            />

            <div className="flex flex-col space-y-2">
              <label htmlFor="password">Password:</label>
              <input
                className="w-60 md:w-96 px-3 py-2 rounded-md border border-slate-400 bg-slate-100"
                type="password"
                id="password"
                {...register("password", { required: true })}
              />
              {errors.password && <span>{errors.password.message}</span>}
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                className="w-60 md:w-96 px-3 py-2 rounded-md border border-slate-400 bg-slate-100"
                type="password"
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) => value === watch("password"),
                })}
              />
              {errors.confirmPassword && (
                <span>{errors.confirmPassword.message}</span>
              )}
            </div>
            <button
              type="submit"
              disabled={isButtonDisabled}
              className={`${
                isButtonDisabled
                  ? "bg-gray-400 hover:bg-gray-400  cursor-not-allowed"
                  : "bg-black"
              } font-inter  font-light w-full px-10 py-2  text-white rounded-md
              hover:bg-neutral-950 hover:drop-shadow-md duration-300 ease-in`}
            >
              Reset Password
            </button>
            <span
              className={`${
                isButtonDisabled ? "text-sm font-light font-inter" : "hidden"
              }`}
            >
              The entered passwords do not match
            </span>
          </form>
          <ToastContainer />
        </div>
      )}
    </>
  );
}
