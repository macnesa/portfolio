import { Response } from "../shared/response.schema";
import { Album, Artist, ExternalIds, ExternalUrls, pagingObject, Followers, Image } from "./primitives/schema";
import { object, string, number, boolean, array, any, ZodType } from "zod";

export const Item = object({
  album_type: string(),
  total_tracks: number(),
  available_markets: array(string()),
  external_urls: ExternalUrls,
  href: string(),
  id: string(),
  images: array(Image),
  name: string(),
  release_date: string(),
  release_date_precision: string(),
  type: string(),
  uri: string(),
  artists: array(Artist),
  album_group: string()
}).strict();

export const artistAlbumsSchema = pagingObject(Item);
