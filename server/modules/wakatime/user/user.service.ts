import axios from 'axios';
import { WAKATIME_API_BASE_URL, SPOTIFY_AUTH_BASE_URL } from "../../../constants/url";


export class UserService {
  static async getWakatimeProfile(access_token: string) {
    try {
      let url = `${WAKATIME_API_BASE_URL}/users/current`; 
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
    }); 
      return data.data;
    } catch (error: any) {
      throw error;
    }
  }
}
