interface Root {
  success: boolean
  status: number
  message: string
  data: Data
}

interface Data {
  items: Item[]
  total: number
  limit: number
  offset: number
  href: string
  next: string
  previous: any
}

interface Item {
  album: Album
  artists: Artist2[]
  available_markets: string[]
  disc_number: number
  duration_ms: number
  explicit: boolean
  external_ids: ExternalIds
  external_urls: ExternalUrls4
  href: string
  id: string
  is_local: boolean
  is_playable: boolean
  name: string
  popularity: number
  preview_url: any
  track_number: number
  type: string
  uri: string
}

interface Album {
  album_type: string
  artists: Artist[]
  available_markets: string[]
  external_urls: ExternalUrls2
  href: string
  id: string
  images: Image[]
  is_playable: boolean
  name: string
  release_date: string
  release_date_precision: string
  total_tracks: number
  type: string
  uri: string
}

interface Artist {
  external_urls: ExternalUrls
  href: string
  id: string
  name: string
  type: string
  uri: string
}

interface ExternalUrls {
  spotify: string
}

interface ExternalUrls2 {
  spotify: string
}

interface Image {
  height: number
  url: string
  width: number
}

interface Artist2 {
  external_urls: ExternalUrls3
  href: string
  id: string
  name: string
  type: string
  uri: string
}

interface ExternalUrls3 {
  spotify: string
}

interface ExternalIds {
  isrc: string
}

interface ExternalUrls4 {
  spotify: string
}

interface TracksState {
  error: string | null
  data: Data[] | null;
  loading: boolean;
  fetch: () => Promise<void>;
}


import { create } from "zustand";

  export const useTracksStore = create<TracksState>((set) => ({
    error: null,
    data: null,
    loading: false,
    fetch: async () => {
      set({ loading: true });
      try {
        const res = await fetch("/api/topTracks");
        const json = await res.json();
        if (!json.success) {
          throw new Error(json.message || 'Unknown API error');
        }
        set({ data: json.data, loading: false });
      } catch (error) {
        set({
          error: error instanceof Error ? error.message : 'Unknown error',
          loading: false,
        });
      }
    }
  }));