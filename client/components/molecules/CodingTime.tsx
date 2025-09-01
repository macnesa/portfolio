import React, { useEffect } from 'react';
import { FaCode } from 'react-icons/fa';
import { useUserStore } from "@/store/wakatime/userStore";
import { CountUp } from '../atoms/CountUp';

export const CodingTime: React.FC = () => {
  const { data, fetch, loading } = useUserStore();

  useEffect(() => {
    if (!data) fetch();
  }, [data]); 
  
  function formatWakatime(totalSeconds: number) {
    const totalMinutes = Math.floor(totalSeconds / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return { hours, minutes };
  }
  
  const { hours, minutes } = data ? formatWakatime(data.total_seconds) : { hours: 0, minutes: 0 };

  return (
    <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 h-36 flex flex-col justify-center items-center shadow-[0_0_20px_rgba(0,0,0,0.6)]">
      <div className="flex items-center gap-2 text-neutral-400 text-xs tracking-wider uppercase">
        <FaCode size={12} className="text-green-500" />
        <span>Hours Spent Coding</span>
      </div>

      <div className="mt-2 text-center">
        {loading ? (
          <div className="animate-pulse">
            <div className="h-10 w-16 bg-neutral-800 rounded-md mx-auto" />
          </div>
        ) : (
          <p className="text-4xl font-mono font-bold text-green-400 tracking-tighter">
            <CountUp value={hours}/>h
          </p>
        )}
      </div>

      <p className="text-[10px] text-neutral-600 mt-2 font-mono">
        [ Log Source: <a href="https://wakatime.com" target="_blank" rel="noreferrer" className="hover:text-green-400 underline">WakaTime</a> ]
      </p>
    </div>
  )
}
