import { create } from "zustand";
import { User } from '../../types/user'
 
interface State<T>{
  error: string | null
  data: T | null;
  loading: boolean;
  fetch: () => Promise<void>;
}

// tcdbt any
export const useUserStore = create<State<any> >((set) => ({
  data: null,
  loading: false,
  error: null,
  fetch: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/wakatime/user/getAllTimeSinceToday`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const json = await res.json();
      if (!json.success) {
        throw new Error(json.message || "Failed to fetch user");
      }
      set({ data: json.data, loading: false });
    } catch (err: any) {
      set({ error: err.message || "Unexpected error", loading: false });
    }
  },
}));