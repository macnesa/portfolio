"use client"

import { useTracksStore } from "@/store/useTracksStore"
import { useEffect } from "react";

export default function TopTrackCard() {
  const { data, fetch, loading } = useTracksStore();
  useEffect(() => {
    if (!data) fetch();
  }, [data, fetch]);
  
  
  return (
    <p>
      jadikan kami anak yang soleh
    </p>
  )
}