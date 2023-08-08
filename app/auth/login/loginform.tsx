"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useCallback, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { User } from "@prisma/client";
import Link from "next/link";
import Loading from "./loading";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface LoginFormData {
  email: string;
  password: string;
}
interface currentUser {
  currentUser?: User | null;
}
const Login: React.FC<currentUser> = ({ currentUser }: currentUser) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    setLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      if (callback?.ok) {
        router.push("/"); // just redirect to login and middleware will take care of rolebased redirect
      }
      if (callback?.error) {
        toast.error(callback.error);
        setLoading(false);
      }
      //setLoading(false);
    });
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
                Login
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
              <div className="flex flex-col space-y-2 mb-2">
                <label className="text-sm font-light" htmlFor="password">
                  Password
                </label>
                <input
                  className="w-60 md:w-96 px-3 py-2 rounded-md border border-slate-400  bg-slate-100"
                  type="password"
                  id="password"
                  {...register("password", { required: true, minLength: 6 })}
                />
                {errors.password && (
                  <span>Password should be atleast characters long</span>
                )}
              </div>
              {/* <div className= "mt--2">  */}
              <Link
                className="text-blue-600 text-sm font-light hover:underline "
                href="/auth/forgotpassword"
              >
                Forgot password?
              </Link>
              {/* </div> */}
              <button
                className="font-inter  font-light w-full px-10 py-2 bg-black text-white rounded-md
            hover:bg-neutral-950 hover:drop-shadow-md duration-300 ease-in"
                type="submit"
              >
                Login
              </button>

              <div className="flex items-center justify-center my-4">
                <div className="border-t border-gray-300 w-full mx-2"></div>
                <span className="text-gray-500 ">or</span>
                <div className="border-t border-gray-300 w-full mx-2"></div>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => signIn("google")}
                  className="flex items-center justify-center w-full px-4 py-2 bg-white text-gray-700 rounded-md shadow-md hover:bg-gray-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    className="w-5 h-5 mr-2"
                  >
                    <path
                      fill="#EA4335"
                      d="M19.08 10.42C19.08 9.38 19 8.28 19 7.5H10v3.04h4.26a4.88 4.88 0 0 1-2.12 3.2v2.66h3.42A10.15 10.15 0 0 0 20 10.42z"
                    />
                    <path
                      fill="#34A853"
                      d="M10 20c2.88 0 5.3-1 7.22-2.66l-3.42-2.66c-1 .64-2.18 1.06-3.8 1.06-2.92 0-5.36-1.9-6.24-4.5H.98v2.84C2.92 17.94 6.36 20 10 20z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M3.76 11.66a6.35 6.35 0 0 1 0-4.12V4.7H.98A10.1 10.1 0 0 0 0 10c0 1.64.4 3.2 1.12 4.6l3.42-2.66a5.02 5.02 0 0 1-.78-2.28z"
                    />
                    <path
                      fill="#4285F4"
                      d="M10 3.58c1.38 0 2.6.48 3.56 1.42l2.67-2.67C15.3.9 12.88 0 10 0 6.36 0 2.92 2.06.98 4.7L4.4 7.36C5.28 4.76 7.72 3.58 10 3.58z"
                    />
                  </svg>
                  Sign in with Google
                </button>
              </div>
              <div className="flex justify-center  mt-30">
                <p className="font-medium mr-2"> Not a member? </p>
                <Link
                  className="text-blue-600 text-sm font-light hover:underline "
                  href="/auth/signin"
                >
                  Sign Up Now
                </Link>
              </div>
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

export default Login;
