"use client";

import { useArtistStore, useArtistTopTracksStore, useArtistAlbumsStore } from '@/store/spotify/artistStore';
import { notFound } from 'next/navigation';
import { useMemo, useEffect, use } from "react";
import isEmpty from 'lodash/isEmpty'
import filter from 'lodash/filter'
import Link from 'next/link';
import { Text } from '@/components/atoms/Text';

export default function ArtistPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  if (!id) return notFound();
  
  const { data: artist, fetch: fetchA, loading: loadingA, setId: setIdA } = useArtistStore();
  
  const { data: topTracks, fetch: fetchB, loading: loadingB, setId: setIdB } = useArtistTopTracksStore();
  
  const { data: albums, fetch: fetchC, loading: loadingC, setId: setIdC } = useArtistAlbumsStore();
 
  useEffect(() => {
    setIdA(id);
     fetchA();
  }, [id, fetchA]);
  
  useEffect(() => {
    setIdB(id);
    fetchB();
  }, [id, fetchB]);
  
  useEffect(() => {
    setIdC(id);
    fetchC();
  }, [id, fetchC]);
  
  console.log(albums);
  
  const typeAlbum = useMemo(() => { 
    if (isEmpty(albums)) return null;
    const items = filter(albums?.items, { album_type: 'album' }); 
    return {
      ...albums,
      items
    }
  }, [albums]);
  
  const typeSingle = useMemo(() => { 
    if (isEmpty(albums)) return null;
    const items = filter(albums?.items, { album_type: 'single' }); 
    return {
      ...albums,
      items
    }
  }, [albums]);
  
  if(isEmpty(artist) || isEmpty(topTracks) || isEmpty(albums) ) return <></>
  
  
  // const typeSingle = useMemo(() => { 
  //   return filter(albums?.items, { album_type: 'single' }); 
  // }, [albums]);
   
  return (
    <>
    {/* v-if="false" style={{background: "#2f2e60"}} border-[2px] border-[rgba(173,167,181,0.2)] */}
    <section className=" h-auto w-full box-border overflow-hidden shadow-xl  grid">
      <section style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5)), url(${artist.images[0].url})` }} className=" h-auto p-8 min-h-[34rem] w-full box-border overflow-hidden shadow-xl border-red-200 grid lg:grid-flow-col lg:grid-cols-[max-content_1fr] bg-center bg-no-repeat bg-cover">
        {/* <div className="grid items-center self-end">
          <div style={{boxShadow: "-1px -1px 30px -9px rgba(0,0,0,1)"}} className="w-[20rem] h-[20rem] border-l-blue-200 grid grid-flow-col grid-cols-[1fr_1fr] grid-rows-[1fr_1fr]">
            
          </div>
        </div> */}
        <div className="border-l-fuchsia-600 flex flex-col justify-end lg:px-4">
          <Text className="sm:text-4xl md:text-6xl lg:text-8xl mb-4 font-extrabold ">{artist.name}</Text>
        </div>
      </section>
      
      <section className='mt-5'>
        <Text className="text-xl font-semibold ">Top Songs</Text>
        
        <div className=" w-full box-border overflow-hidden mt-2 pb-2 shadow-xl  border-yellow-300  grid items-center grid-flow-cols  grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {topTracks.tracks.map((each, index) => (
          // onDoubleClick={() => playMusic(each.track)} ${isPreviewAvailable(each.track)}
          <button key={index} className={` teer border-[rgba(222,222,222,0.1)] border-t hover:bg-[rgba(222,222,222,0.1)] hover:text-white text-unfocus-500  mx-2 focus:bg-[rgba(222,222,222,0.3)] cursor-pointer`}>
            <div className="px-3 py-2 flex border-white">
              <img alt='cover album' src={each.album.images[1]?.url} className="rounded-sm" width={40} height={40} />
              <div className="ml-4 p-0 flex flex-col text-start border-white justify-center truncate">
                <Text className="text-sm flex  border-red-300"> {each.name} </Text>
                <span className="text-[rgba(255,255,255,0.5)] text-xs border-red-300"> 
                  <Link href={`/album/${each.album.id}`} className='hover:underline'>{each.album.name}</Link> -  { new Date(each.album.release_date).getFullYear()} 
                  </span>
              </div>
            </div>
          </button>
          ))}
        </div>
        
      </section>
      
      {!isEmpty(typeAlbum) && !isEmpty(typeAlbum?.items) && (
      <section className='mt-5'>
        <Text className="text-xl font-semibold ">Albums</Text>
        
        <section className="mt-2 border-green-400 grid md:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr] gap-4 h overflow-hidden">
          
        { typeAlbum.items.map((each, index) => (
          <div key={index} className="rounded-md mb-4 border-csd grid text-unfocus-500 hover:brightness-[.9] cursor-default">
            
            <div className="border-green-400 w-full rounded-md overflow-hidden">
              <img alt='cover album' width={'100%'} src={each.images[0]?.url}/>
            </div>
            
            <Text className="text-[rgba(255,255,255,0.8)]  text-xs mt-2"> { each.name } </Text>
            <Text className="text-[rgba(255,255,255,0.5)]  text-xs "> { new Date(each.release_date).getFullYear()} </Text>
            
          </div>
        )) }
        </section>
        
      </section>
      )}
      
      
      {!isEmpty(typeSingle) && !isEmpty(typeSingle.items) && (
      <section className='mt-5'>
        <Text className="text-xl px-5 font-semibold ">Single</Text>
        
        <section className="mt-2 border-green-400 grid md:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr] gap-4 h overflow-hidden">
          
        { typeSingle.items.map((each, index) => (
          <div key={index} className="rounded-md mb-4 border-csd grid text-unfocus-500 hover:brightness-[.9] cursor-default">
            
            <div className="border-green-400 w-full rounded-md overflow-hidden">
              <img alt='cover album' width={'100%'} src={each.images[0]?.url}/>
            </div>
            
            <Text className="text-[rgba(255,255,255,0.8)]  text-xs mt-2"> { each.name } </Text>
            <Text className="text-[rgba(255,255,255,0.5)]  text-xs "> { new Date(each.release_date).getFullYear()} </Text>
            
          </div>
        )) }
        </section>
      </section>
      )}
      
        
      
      
      
      
      {/* <img src={data.images[0].url} /> */}
    </section>
    </>
  );
}

