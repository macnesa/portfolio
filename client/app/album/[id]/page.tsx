"use client";
import { useAlbumStore, useAlbumTracksStore } from '@/store/spotify/albumStore';
import { notFound } from 'next/navigation';
import { useState, useEffect, use, useRef } from "react";
import isEmpty from 'lodash/isEmpty'
import filter from 'lodash/filter'
import Link from 'next/link';
import ColorThief from 'colorthief';

export default function AlbumPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  if (!id) return notFound(); 
  
  const { data: album, fetch: fetchA, loading: loadingA, setId: setIdA } = useAlbumStore();
  
  const { data: tracks, fetch: fetchB, loading: loadingB, setId: setIdB } = useAlbumTracksStore();
  
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [dominantColor, setDominantColor] = useState<[number, number, number] | null>(null);
  
  const handleImageLoad = () =>  {
    if (imgRef.current) {
      const colorThief = new ColorThief();
      try {
        const color = colorThief.getColor(imgRef.current);
        setDominantColor(color);
      } catch (error) {
        console.error('Failed to Extract Colors:', error);
      }
    }
  };
  
  const msToTimeFormat = (milliseconds: number) => {
    var minutes = Math.floor(milliseconds / (1000 * 60));
    var seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    return minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
  }
  
  const toFullDate = (date: string) => {
    const data = new Date(date);
    return data.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long', 
      day: '2-digit'
    });
  }
  
  // const { data: albums, fetch: fetchC, loading: loadingC, setId: setIdC } = useArtistAlbumsStore();
 
  useEffect(() => {
    setIdA(id);
    fetchA();
  }, [id]);
  
  useEffect(() => {
    setIdB(id);
    fetchB();
  }, [id]);
  
  // useEffect(() => {
  //   setIdC(id);
  //   if (!albums) fetchC();
  // }, [id, albums, fetchC]);
  
  // console.log(albums);
  
  // const typeAlbum = useMemo(() => { 
  //   if (isEmpty(albums)) return null;
  //   const items = filter(albums?.items, { album_type: 'album' }); 
  //   return {
  //     ...albums,
  //     items
  //   }
  // }, [albums]);
  
  // const typeSingle = useMemo(() => { 
  //   if (isEmpty(albums)) return null;
  //   const items = filter(albums?.items, { album_type: 'single' }); 
  //   return {
  //     ...albums,
  //     items
  //   }
  // }, [albums]);
  
  if(isEmpty(album) || isEmpty(tracks) || loadingA || loadingB ) return <></>
  
  
  // const typeSingle = useMemo(() => { 
  //   return filter(albums?.items, { album_type: 'single' }); 
  // }, [albums]);
   
  return (
    <>
    {/* v-if="false" style={{background: "#2f2e60"}} border-[2px] border-[rgba(173,167,181,0.2)] */}
    <section style={{ backgroundColor: dominantColor ? `rgba(${dominantColor.join(',')},0.5)` : 'transparent' }} className=" h-auto w-full box-border overflow-hidden shadow-xl  grid">
      {/* style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5)), url(${artist.images[0].url})` }} */}
      <section className=" h-auto p-8 min-h-[24rem] w-full box-border overflow-hidden shadow-2xl border-red-200 grid lg:grid-flow-col lg:grid-cols-[max-content_1fr] bg-center bg-no-repeat bg-cover">
        <div className="grid items-center self-end">
          <div style={{boxShadow: "-1px -1px 30px -9px rgba(0,0,0,1)"}} className="w-[20rem] h-[20rem] border-l-blue-200 ">
            <img ref={imgRef}  src={album.images[0].url} onLoad={handleImageLoad} className="w-[100%] h-[100%]"  crossOrigin="anonymous"/>
          </div>
        </div>
        <div className="border-l-fuchsia-600 flex flex-col justify-end lg:px-4">
          <p className="sm:text-4xl md:text-6xl lg:text-8xl mb-4 font-extrabold text-white">{ album.name }</p>
          <span className="text-white font-normal sm:text-sm md:text-sm lg:text-sm">
          {album.artists.map((artist, index) => (
            <span key={artist.id}>
              <Link href={`/artist/${artist.id}`} className="hover:underline">
                {artist.name}
              </Link>
              {index < album.artists.length - 1 && ', '}
            </span>
          ))}
          </span>
          <p className="sm:text-sm md:text-sm lg:text-sm font-normal text-[rgba(255,255,255,0.5)] ">{ new Date(album.release_date).getFullYear()  }</p>
        </div>
      </section>
      
      {/*  */}
      <div style={{ background: 'linear-gradient(to top, rgba(31,31,31,1) 20%, rgba(31,31,31,1) 40%, rgba(31,31,31,0.98) 50%, rgba(31,31,31,0.95) 60%, rgba(31,31,31,0.9) 70%, rgba(31,31,31,0.85) 80%, rgba(31,31,31,0.75) 90%, rgba(31,31,31,0.65) 95%, rgba(31,31,31,0.6) 100%)' }} className="relative overflow-x-auto px-4 pt-4 pb-4">
        <table className="w-full text-sm text-left border-white text-unfocus-500">
          <thead className="border-b border-[rgba(222,222,222,0.1)] text-gray-400">
            {/* Isi head di sini jika diperlukan */}
          </thead>
          <tbody>
            {tracks.items.map((each, index) => (
              // onDoubleClick={() => playMusic(each)} ${isPreviewAvailable(each)}
              <tr key={each.id}  className={` teer  cursor-pointer text-gray-400 dark:focus:bg-gray-800 font-sans  border-white rounded-xl hover:bg-[rgba(222,222,222,0.1)] hover:text-white`}>
                <th style={{ borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px' }} scope="row" className=" text-end pr-2 box-border font-normal border-white whitespace-nowrap">
                  {index + 1}
                </th>
                <td className="py-2 flex border-white">
                  {/* <img src={album.images[1].url} width={40} height={40} className="rounded-sm" alt="" /> */}
                  <div className="ml-2 p-0 flex flex-col justify-center">
                    <p className="font-normal font-sans text-sm flex text-white border-red-300">{each.name}</p>
                    <span className="hover:cursor-pointer font-normal font-sans text-xs ">
                    {each.artists.map((o, i) => (
                      <Link key={o.id} href={`/artist/${o.id}`} className="hover:underline sm:text-sm md:text-sm lg:text-sm font-normal">
                        {o.name}{i + 1 !== each.artists.length ? ', ' : ''}
                      </Link>
                    ))} 
                    </span>
                  </div>
                </td> 
                <td style={{ borderTopRightRadius: '10px', borderBottomRightRadius: '10px' }} className=" text-sm font-normal border-white">{msToTimeFormat(each.duration_ms)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <section className="bg-dark h-auto p-8 min-h-[6rem] w-full box-border overflow-hidden border-red-200">
        <p className="sm:text-sm md:text-sm lg:text-sm font-normal text-[rgba(255,255,255,0.5)] ">{ toFullDate(album.release_date) }</p>
        <p className="sm:text-xs md:text-xs lg:text-xs font-normal text-[rgba(255,255,255,0.5)] ">ⓟ { album.label }</p>
      </section>

        
    </section>
    </>
  );
}

