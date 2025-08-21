import { create } from "zustand";
import { Album } from '../../types/album'
import { AlbumTracks } from '../../types/albumTracks'

interface State<T>{
  id: string | null,
  error: string | null
  data: T | null;
  loading: boolean;
  setId: (id: string) => void;
  fetch: () => Promise<void>;
}

export const useAlbumStore = create< State<Album['data']> >((set, get) => ({
  id: null,
  data: null,
  loading: false,
  error: null,
  setId: (id) => set({ id }),
  fetch: async () => {
    const id = get().id;
    if (!id) return;
    set({ loading: true, error: null });
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/albums/getAlbum/${id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const json: Album = await res.json();
      if (!json.success) {
        throw new Error(json.message || "Failed to fetch albums");
      }
      set({ data: json.data, loading: false });
    } catch (err: any) {
      set({ error: err.message || "Unexpected error", loading: false });
    }
  },
}));


export const useAlbumTracksStore = create< State<AlbumTracks['data']> >((set, get) => ({
  id: null,
  data: null,
  loading: false,
  error: null,
  setId: (id) => set({ id }),
  fetch: async () => {
    const id = get().id;
    if (!id) return;
    set({ loading: true, error: null });
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/albums/getTracks/${id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const json: AlbumTracks= await res.json();
      if (!json.success) {
        throw new Error(json.message || "Failed to fetch tracks");
      }
      set({ data: json.data, loading: false });
    } catch (err: any) {
      set({ error: err.message || "Unexpected error", loading: false });
    }
  },
}));