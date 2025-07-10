"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { hover } from "@/lib/hover";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";

type UseAuthForm = {
  email: string;
  password: string;
};

export const signInSchema = yup.object().shape({
  email: yup.string().email("Email tidak valid").required("Email wajib diisi"),
  password: yup
    .string()
    .min(6, "Password minimal 6 karakter")
    .required("Password wajib diisi"),
});

function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errCredential, setErrCredential] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UseAuthForm>({
    resolver: yupResolver(signInSchema),
  });

  const handleSignIn = async (data: UseAuthForm) => {
    setIsLoading(true);
    try {
      const callbackUrl = searchParams.get("callbackUrl") || "/";

      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl,
        redirect: false,
      });

      if (res?.error === "CredentialsSignin") {
        setErrCredential("Email or Password wrong");
      }

      if (res?.ok && res.url) {
        router.push(res.url);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col w-[100%] gap-4 items-center"
      onSubmit={handleSubmit(handleSignIn)}
    >
      <div className="w-[100%] text-3xl font-semibold tracking-widest mb-2 text-center">
        Masuk akun anda
      </div>
      {errCredential && (
        <div className="bg-red-500/10 w-[100%] text-red-700 border border-red-300 p-2 rounded">
          {errCredential}
        </div>
      )}
      <div className="w-[100%] relative mb-3">
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
          {...register("password")}
          error={errors.password?.message}
          onPressSuffix={() => setShowPassword(!showPassword)}
        />
      </div>

      <Button
        type="submit"
        className={cn("w-[100%] bg-leaf mt-6", hover.shadow)}
        disabled={isLoading}
      >
        {isLoading ? "...loading" : "Masuk"}
      </Button>
    </form>
  );
}

export default SignInForm;
