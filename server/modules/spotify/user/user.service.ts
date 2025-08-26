import axios from 'axios';
import { SPOTIFY_API_BASE_URL, SPOTIFY_AUTH_BASE_URL } from "../../../constants/url";


export class UserService {
  static async getSpotifyProfile(access_token: string) {
    try {
      let url = `${SPOTIFY_API_BASE_URL}/me`; 
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
    }); 
      return data;
    } catch (error: any) {
      throw error;
    }
  }
}
