import axios from "axios";
import { SPOTIFY_AUTH_BASE_URL } from "../../constants/url";

export class AuthService {

  private static get clientId(): string {
    if (!process.env.CLIENT_ID) throw new Error("Missing CLIENT_ID in env");
    return process.env.CLIENT_ID;
  }
  private static get clientSecret(): string {
    if (!process.env.CLIENT_SECRET)
      throw new Error("Missing CLIENT_SECRET in env");
    return process.env.CLIENT_SECRET;
  }
  private static get spotifyBuffer(): string {
    const raw = `${this.clientId}:${this.clientSecret}`;
    return `Basic ${Buffer.from(raw).toString("base64")}`;
  }

  static async refreshSpotifyToken(refreshToken: string) {
    try {
      const body = new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      });
      const fetch = await axios.post(
        `${SPOTIFY_AUTH_BASE_URL}/api/token`,
        body.toString(),
        {
          headers: {
            Authorization: this.spotifyBuffer,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      
      if (fetch.data.error) {
        throw new Error(`Spotify token refresh error: ${fetch.data.error_description || fetch.data.error}`);
      }
      return fetch.data
    } catch (error) {
      throw error
    }
  }
}
