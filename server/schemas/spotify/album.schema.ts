import { Response } from "../shared/response.schema";
import { Album, Artist, Copyright, ExternalUpc, ExternalIds, ExternalUrls, pagingObject, LinkedFrom, Image, Restrictions } from "./primitives/schema";
import { object, string, number, boolean, array, any, ZodType } from "zod";
 

export const Item = object({
  artists: array(Artist),
  available_markets: array(string()),
  disc_number: number(),
  duration_ms: number(),
  explicit: boolean(),
  external_urls: ExternalUrls,
  href: string(),
  id: string(),
  linked_from: LinkedFrom.optional(),
  name: string(),
  preview_url: any(),
  track_number: number(),
  type: string(),
  uri: string(),
  is_local: boolean(),
  restrictions: Restrictions.optional()
})

export const Root = object({
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
  tracks: pagingObject(Item),
  copyrights: array(Copyright),
  external_ids: ExternalUpc,
  genres: array(any()),
  label: string(),
  popularity: number()
}).strict();

export const albumSchema = Root;
