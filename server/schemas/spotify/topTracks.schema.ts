import { Response } from "../shared/response.schema";
import { Album, Artist, ExternalIds, ExternalUrls, pagingObject } from "./primitives/schema";
import { object, string, number, boolean, array, any, ZodType } from "zod";

export const Item = object({
  album: Album,
  artists: array(Artist),
  available_markets: array(string()),
  disc_number: number(),
  duration_ms: number(),
  explicit: boolean(),
  external_ids: ExternalIds,
  external_urls: ExternalUrls,
  href: string(),
  id: string(),
  is_local: boolean(),
  is_playable: boolean(),
  name: string(),
  popularity: number(),
  preview_url: any().nullable(),
  track_number: number(),
  type: string(),
  uri: string(),
}).strict();

export const topTracksSchema = pagingObject(Item)
