import { create } from "zustand";
import { TopArtists } from '../types/topArtists'

interface State {
  error: string | null
  data: TopArtists['data'] | null;
  loading: boolean;
  fetch: () => Promise<void>;
}

export const useArtistsStore = create<State>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetch: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/getTop/artists`, {
        method: 'GET',
        credentials: 'include',
      });
      const json: TopArtists = await res.json();
      if (!json.success) {
        throw new Error(json.message || 'Failed to fetch artists');
      }
      set({ data: json.data, loading: false });
    } catch (err: any) {
      set({ error: err.message || 'Unexpected error', loading: false });
    }
  },
}));