"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import Loading from "./loading";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const FormSchema = z.object({
  name: z
    .string()
    .min(6, { message: "Name must be at least 6 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .regex(/[a-zA-Z]/, { message: "Password must contain at least one letter" })
    .regex(/\d/, { message: "Password must contain at least one digit" })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "Password must contain at least one special character",
    }),
});

type FormSchemaType = z.infer<typeof FormSchema>;
const CreateUserForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/register/", data);
      console.log(response.data);
      if (response.data.message === "Email is already in use") {
        toast.error("Email is already in use");
      } else {
        signIn("credentials", {
          ...data,
          redirect: false,
        }).then((callback) => {
          if (callback?.ok) {
            router.push("/");
          }
          if (callback?.error) {
            toast.error(callback.error);
          }
          setTimeout(() => setLoading(false), 1000);
        });
      }
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };
  return (
    <main>
      <div
        className="w-screen h-screen flex justify-center items-center
    bg-zinc-900"
      >
        {loading ? (
          <Loading />
        ) : (
          <form
            className="p-10 bg-white rounded-xl drop-shadow-lg space-y-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="font-inter text-center text-3xl font-medium">
              Create Account
            </h1>
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-light" htmlFor="name">
                Name
              </label>
              <input
                className="w-60 md:w-96 px-3 py-2 rounded-md border border-slate-400 bg-slate-100"
                type="text"
                id="name"
                {...register("name", { required: true })}
              />
              {errors.name && <span>{errors.name.message}</span>}
            </div>
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
              {errors.email && <span>{errors.email.message}</span>}
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-light" htmlFor="password">
                Password
              </label>
              <input
                className="w-60 md:w-96 px-3 py-2 rounded-md border border-slate-400  bg-slate-100"
                type="password"
                id="password"
                {...register("password", { required: true })}
              />
              {errors.password && <span>{errors.password.message}</span>}
            </div>
            <button
              className="font-inter  font-light w-full px-10 py-2 bg-black text-white rounded-md
            hover:bg-neutral-950 hover:drop-shadow-md duration-300 ease-in"
              type="submit"
            >
              Create User
            </button>
          </form>
        )}
        <ToastContainer />
      </div>
    </main>
  );
};
export default CreateUserForm;
