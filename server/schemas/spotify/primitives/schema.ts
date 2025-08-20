import { object, string, number, boolean, array, any, ZodType } from "zod";

export const ExternalUrls = object({
  spotify: string(),
});

export const ExternalIds = object({
  isrc: string(),
});

export const Image = object({
  height: number(),
  url: string(),
  width: number(),
});

export const Artist = object({
  external_urls: ExternalUrls,
  href: string(),
  id: string(),
  name: string(),
  type: string(),
  uri: string(),
});
 
export const Followers = object({
  href: any(),
  total: number()
})

export const Album = object({
  album_type: string(),
  artists: array(Artist),
  available_markets: array(string()),
  external_urls: ExternalUrls,
  href: string(),
  id: string(),
  images: array(Image),
  is_playable: boolean(),
  name: string(),
  release_date: string(),
  release_date_precision: string(),
  total_tracks: number(),
  type: string(),
  uri: string(),
});



export const pagingObject = <T extends ZodType<any>>(item: T) =>
  object({
    items: array(item),
    total: number(),
    limit: number(),
    offset: number(),
    href: string(),
    next: string().nullable(),
    previous: string().nullable(),
  });
 