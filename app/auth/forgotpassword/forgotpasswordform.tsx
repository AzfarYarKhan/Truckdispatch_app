"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useCallback, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { User } from "@prisma/client";
import Loading from "./loading";
import Link from "next/link";

interface FormData {
  email: string;
}
interface currentUser {
  currentUser?: User | null;
}
const ForgetPasswordForm: React.FC<currentUser> = ({
  currentUser,
}: currentUser) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/forgotpassword/", data);
      console.log(response.data);
      if (response.data.message === "No user with this email exits") {
        toast.error("Invalid Email, No user with this email exits");
      } else if (
        response.data.message ===
        "An email has been sent to you to reset your password."
      ) {
        setLoading(false);
        toast.success("Reset link has been sent to this email");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return currentUser === null ? (
    <main>
      {loading ? (
        <Loading />
      ) : (
        <div
          className="w-screen h-screen flex justify-center items-center
        bg-zinc-900"
        >
          <div className="flex flex-col space-y-2">
            <form
              className="p-10 bg-white rounded-xl drop-shadow-lg space-y-5"
              onSubmit={handleSubmit(onSubmit)}
            >
              <h1 className="font-inter text-center text-3xl font-medium">
                Enter the Email
              </h1>
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-light" htmlFor="email">
                  Email
                </label>
                <input
                  className="w-60 md:w-96 px-3 py-2 rounded-md border border-slate-400  bg-slate-100"
                  type="email"
                  id="email"
                  {...register("email", { required: true })}
                />
                {errors.email && <span>Email is required</span>}
              </div>
              <button
                className="font-inter  font-light w-full px-10 py-2 bg-black text-white rounded-md
            hover:bg-neutral-950 hover:drop-shadow-md duration-300 ease-in"
                type="submit"
              >
                Submit
              </button>
            </form>
            <ToastContainer />
          </div>
        </div>
      )}
    </main>
  ) : (
    <Loading />
  );
};

export default ForgetPasswordForm;
