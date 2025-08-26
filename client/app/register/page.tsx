"use client";

import { Button } from "@/components/atoms/Button";
import { TextField } from "@/components/molecules/TextField";
import { useFormModel } from "@/hooks/useFormModel";
import api from "@/lib/api";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function RegisterPage() {
  const { model, form } = useFormModel({ 
    username: null,
    email: null,
    password: null
  }); 
  

  const manualSignIn = async () => {
    try {
      const response = await api.post("/auth/postManualSignUp", model);
      
    } catch (error) {
      console.error(error);
      
    }
  };
  
  const spotifySignIn = () => {
    window.location.assign(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/getLogin`)
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="flex items-center gap-12">
        
        {/* Left - Login Form */}
        <div className="w-full max-w-md bg-white  rounded-2xl border border-gray-200 p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h2>
          <p className="text-gray-600 mb-8">
            Start your journey in seconds. Alredy have an account?{" "}
            <Link href={`/login`} className="hover:underline text-blue-600"> Sign in </Link>
          </p>

          {/* onSubmit={handleSubmit}  */}
          <div className="space-y-6">
            <div className="grid gap-2">
              <TextField type="text" label={"Username"} name={'username'} model={model} placeholder="iamcoldplay23" />
              <TextField type="email" label={"Email"} name={'email'} model={model} placeholder="name@gmail.com" />
              <TextField type="password" label={"Password"} name={'password'} model={model} />
            </div>
            <Button type="primary" onClick={manualSignIn}>Sign Up to your account</Button>
          </div>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="px-4 text-gray-500 text-sm">or continue with</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-4">
            <Button>
              Google
            </Button>
            
            <Button onClick={spotifySignIn}>
              Spotify
            </Button>
             
          </div>

        </div>

        {/* Right - Illustration (outside card, no border) */}
        <div className="hidden md:flex items-center justify-center">
          <img
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/authentication/illustration.svg"
            alt="Login Illustration"
            className="max-w-sm"
          />
        </div>
      </div>
    </div>
  );
}
