import axios from "axios";
import {
  LASTFM_API_BASE_URL,
  SPOTIFY_AUTH_BASE_URL,
} from "../../../constants/url";

export class UserService {
  
  private static get lastFmKey(): string {
    if (!process.env.LASTFM_API_KEY) throw new Error("Missing LASTFM_API_KEY in env");
    return process.env.LASTFM_API_KEY;
  }
  
  static async getProfile(session_key: string) {
    try {
      const url = `${LASTFM_API_BASE_URL}`;
      const { data } = await axios.get(url, {
        params: {
          method: "user.getInfo",
          api_key: this.lastFmKey,
          sk: session_key,
          format: "json",
        },
      });
      return data;
    } catch (error: any) {
      throw error;
    }
  }
}
