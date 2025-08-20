import { create } from "zustand";
import { TopArtists } from '../../types/topArtists'
import { TopTracks } from '../../types/topTracks'

 
interface State<T>{
  error: string | null
  data: T | null;
  loading: boolean;
  fetch: () => Promise<void>;
}

export const useTopArtistsStore = create< State<TopArtists['data']> >((set) => ({
  data: null,
  loading: false,
  error: null,
  fetch: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user/getTop/artists`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const json: TopArtists = await res.json();
      if (!json.success) {
        throw new Error(json.message || "Failed to fetch artists");
      }
      set({ data: json.data, loading: false });
    } catch (err: any) {
      set({ error: err.message || "Unexpected error", loading: false });
    }
  },
}));

export const useTopTracksStore = create< State<TopTracks['data']> >((set) => ({
  data: null,
  loading: false,
  error: null,
  fetch: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/getTop/tracks`, {
        method: 'GET',
        credentials: 'include',
      });
      const json: TopTracks = await res.json();
      if (!json.success) {
        throw new Error(json.message || 'Failed to fetch tracks');
      }
      set({ data: json.data, loading: false });
    } catch (err: any) {
      set({ error: err.message || 'Unexpected error', loading: false });
    }
  },
}));