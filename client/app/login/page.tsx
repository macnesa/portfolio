"use client";

import { Button } from "@/components/atoms/Button";
import { TextField } from "@/components/molecules/TextField";
import { useFormModel } from "@/hooks/useFormModel";
import api from "@/lib/api";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 
import { FaSpotify, FaLastfmSquare, FaCodeBranch } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
 

export default function LoginPage() {
  const router = useRouter();
  
  const { model, form } = useFormModel({ 
    email: null,
    password: null
  }); 
  

  const manualSignIn = async () => {
   try {
    const response = await api.post("/auth/postManualSignIn", model);
    router.push('/')
   } catch (error) {
    console.error(error);
   }
  };
  
  const spotifySignIn = () => {
    window.location.assign(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/getLogin`)
  }
  const lastFmSignIn = () => {
    window.location.assign(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/getLoginLastfm`)
  }
  
  const wakatimeSignIn = () => {
    window.location.assign(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/getLoginWakatime`)
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="flex items-center gap-12">
        
        {/* Left - Login Form */}
        <div className="w-full max-w-md bg-white  rounded-2xl border border-gray-200 p-8">
          <h2 className="hidden text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
          <p className="hidden text-gray-600 mb-8">
            Start your journey in seconds. Don’t have an account?{" "}
            <Link href={`/register`} className="hover:underline text-blue-600"> Sign up </Link> 
          </p>

          {/* onSubmit={handleSubmit}  */}
          <div className="hidden space-y-6">
            <div className="grid gap-2">
              <TextField type="email" label={"Email"} name={'email'} model={model} placeholder="name@gmail.com" />
              <TextField type="password" label={"Password"} name={'password'} model={model} />
            </div>
            <Button type="primary" onClick={manualSignIn}>Sign in to your account</Button>
          </div>

          {/* Divider */}
          <div className="hidden flex items-center my-6">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="px-4 text-gray-500 text-sm">or continue with</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          {/* Social Logins */}
          <div className="grid gap-4">
            <Button onClick={lastFmSignIn} className="flex items-center justify-center gap-2">
              <FaLastfmSquare/>
              Last.fm
            </Button>
            
            <Button onClick={spotifySignIn} className="flex items-center justify-center gap-2">
              <FaSpotify color="#1DB954"/>
              <span>Spotify</span>
            </Button>
            
            <Button onClick={wakatimeSignIn} className="flex items-center justify-center gap-2">
              <FaCodeBranch/>
              <span>Wakatime</span>
            </Button>
            
            
            {/* <button
              className="flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition"
            >
              <span className="font-medium text-gray-700">Google</span>
            </button> */}

            {/* <button
              className="flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition"
            >
              <span className="font-medium text-gray-700">Spotify</span>
            </button> */}
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
