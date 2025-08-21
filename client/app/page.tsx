import TopArtistCard from "@/components/organisms/TopArtistCard";
import TopArtistsList from "@/components/organisms/TopArtistsList";
import TopTrackCard from "@/components/organisms/TopTrackCard";
import TopTracksList from "@/components/organisms/TopTracksList";
import Image from "next/image";


export default function Home() {
  return (
    <>
      {/* <TopArtistCard/> */}
      <TopTracksList/>
      <TopArtistsList/> 
      <TopTrackCard/>
    </>
  );
}
