"use client"; 
import { useEffect } from "react";
import { SPOTIFY_AUTH_URL } from "../constants/constants";

export default function LoginPage() {
  useEffect(() => {
    // window.location.replace
    window.location.assign(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/getLogin`)
  }, []);
  
  
  return (
    <>
    </>
  );
}
