"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { hover } from "@/lib/hover";
import { cn } from "@/lib/utils";
import { useRegisterMutation } from "@/service/auth.service";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import { useRouter } from "next/navigation";

export type SignUpForm = {
  name: string;
  email: string;
  password: string;
  confPassword: string;
};

const signUpSchema = yup.object().shape({
  name: yup.string().required("Nama wajib diisi"),
  email: yup.string().email("Email tidak valid").required("Email wajib diisi"),
  password: yup
    .string()
    .min(6, "Password minimal 6 karakter")
    .required("Password wajib diisi"),
  confPassword: yup
    .string()
    .min(6, "Konfirmasi password minimal 6 karakter")
    .required("Konfirmasi password wajib diisi")
    .oneOf([yup.ref("password")], "Password tidak cocok"),
});

function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmationPassword, setShowConfirmationPassword] =
    useState(false);

  const [registerMutation, { isLoading, error }] = useRegisterMutation();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: yupResolver(signUpSchema),
  });

  const handleSignUp = async (data: SignUpForm) => {
    // setIsLoading(true);
    try {
      // const callbackUrl = searchParams.get("callbackUrl") || "/";

      await registerMutation(data).unwrap();

      router.push("/auth/signin");

      // if (res?.error === "CredentialsSignin") {
      //   setErrCredential("Invalid credentials");
      // }
    } catch (error) {
      console.log(error);
    }
  };

  console.log("err mutation", error);

  return (
    <form
      onSubmit={handleSubmit(handleSignUp)}
      className="flex flex-col w-[100%] gap-4 items-center"
    >
      <div className="w-[100%] text-3xl font-semibold tracking-widest mb-2 text-center">
        Buat akun baru
      </div>
      {(error as any)?.data?.message && (
        <div className="bg-red-500/10 w-[100%] w-full text-red-700 border border-red-300 p-2 rounded">
          {(error as any).data.message}
        </div>
      )}

      <div className="w-[100%] relative">
        <Input
          className={`w-[100%] p-4 rounded-sm ${
            errors.name?.message && "border border-red-400"
          }`}
          type="text"
          placeholder="Nama Lengkap"
          {...register("name")}
          error={errors.name?.message}
        />
      </div>
      <div className="w-[100%] relative">
        <Input
          className={`w-[100%] p-4 rounded-sm ${
            errors.email?.message && "border border-red-400"
          }`}
          type="text"
          placeholder="Email"
          {...register("email")}
          error={errors.email?.message}
        />
      </div>

      <div className="w-[100%] relative">
        <Input
          className={`w-[100%] p-4 rounded-sm ${
            errors.password?.message && "border border-red-400"
          }`}
          type={showPassword ? "text" : "password"}
          placeholder="Kata Sandi"
          suffix="Eye"
          onPressSuffix={() => setShowPassword(!showPassword)}
          {...register("password")}
          error={errors.password?.message}
        />
      </div>
      <div className="w-[100%] relative">
        <Input
          className={`w-[100%] p-4 rounded-sm ${
            errors.confPassword?.message && "border border-red-400"
          }`}
          type={showConfirmationPassword ? "text" : "password"}
          placeholder="Konfirmasi Kata Sandi"
          suffix="Eye"
          onPressSuffix={() =>
            setShowConfirmationPassword(!showConfirmationPassword)
          }
          {...register("confPassword")}
          error={errors.confPassword?.message}
        />
      </div>

      <Button
        type="submit"
        className={cn("w-[100%] bg-leaf mt-6", hover.shadow)}
        disabled={isLoading}
      >
        {isLoading ? "Loading...." : "Buat Akun"}
      </Button>
    </form>
  );
}

export default SignUpForm;
