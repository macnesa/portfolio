import { create } from "zustand";
import { Artist } from '../../types/artist'
import { ArtistTopTracks } from '../../types/artistTopTracks'
import { ArtistAlbums } from '../../types/artistAlbums'

interface State<T>{
  id: string | null,
  error: string | null
  data: T | null;
  loading: boolean;
  setId: (id: string) => void;
  fetch: () => Promise<void>;
}

export const useArtistStore = create< State<Artist['data']> >((set, get) => ({
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
        `${process.env.NEXT_PUBLIC_SERVER_URL}/artists/getArtist/${id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const json: Artist = await res.json();
      if (!json.success) {
        throw new Error(json.message || "Failed to fetch artists");
      }
      set({ data: json.data, loading: false });
    } catch (err: any) {
      set({ error: err.message || "Unexpected error", loading: false });
    }
  },
}));

export const useArtistTopTracksStore = create< State<ArtistTopTracks['data']> >((set, get) => ({
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
        `${process.env.NEXT_PUBLIC_SERVER_URL}/artists/getTopTracks/${id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const json: ArtistTopTracks = await res.json();
      if (!json.success) {
        throw new Error(json.message || "Failed to fetch artists");
      }
      set({ data: json.data, loading: false });
    } catch (err: any) {
      set({ error: err.message || "Unexpected error", loading: false });
    }
  },
}));

export const useArtistAlbumsStore = create< State<ArtistAlbums['data']> >((set, get) => ({
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
        `${process.env.NEXT_PUBLIC_SERVER_URL}/artists/getAlbums/${id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const json: ArtistAlbums = await res.json();
      if (!json.success) {
        throw new Error(json.message || "Failed to fetch artists");
      }
      set({ data: json.data, loading: false });
    } catch (err: any) {
      set({ error: err.message || "Unexpected error", loading: false });
    }
  },
}));