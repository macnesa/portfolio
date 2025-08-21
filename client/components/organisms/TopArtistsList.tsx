"use client";

import { useTopArtistsStore } from "@/store/spotify/userStore";
import isEmpty from "lodash/isEmpty";
import { useEffect, useMemo } from "react";
import { Text } from "../atoms/Text";
import Link from "next/link";
export default function TopArtistsList() {
  
  const { data, fetch, loading } = useTopArtistsStore();

  useEffect(() => {
    if (!data) fetch();
  }, [data]);
  
  if (loading || isEmpty(data) || isEmpty(data?.items) ) return <></>;
  
  return (
    <>
      <div className="w-full mt-10 border-yellow-300">
        <Text className="text-xl ">Your Top Artists</Text>
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5 mt-2">
          {data.items.slice(0,6).map((each, index) => (
            <Link href={`/artist/${each.id}`} key={index}>
              <div className="rounded-md mb-4 border-csd grid text-unfocus-500 hover:brightness-[.9] cursor-pointer">
                
                {/* Container square */}
                <div className="relative w-full aspect-square rounded-md overflow-hidden">
                  
                  {/* Gambar: full, absolute, crop */}
                  <img src={each.images[0]?.url} alt={`Album cover ${index}`} className=" absolute brightness-90 inset-0 w-full h-full object-cover" />

                  {/* Overlay text di bawah */}
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4" title={each.name}>
                  {(() => {
                    const [firstWord, ...restWords] = each.name.split(' ');
                    const rest = restWords.join(' ');
                    return (
                      <>
                        {rest && (
                          <Text className=" text-xl leading-tight font-normal text-[rgba(255,255,255,0.8)]">
                            {firstWord}
                          </Text>
                        )}
                        <Text className="md:text-3xl text-4xl leading-tight font-semibold  truncate">
                          {rest || firstWord}
                        </Text>
                      </>
                    );
                  })()}
                  </div>


                </div>

              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}


          {/* <Text className="text-[rgba(255,255,255,0.8)]  text-xs mt-2"> { each.name } </Text>
          <Text className="text-[rgba(255,255,255,0.5)]  text-xs "> { new Date(each.release_date).getFullYear()} </Text> */}
          