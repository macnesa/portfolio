import { Response } from "../shared/response.schema";
import { Album, Artist, ExternalIds, ExternalUrls, pagingObject, Followers, Image } from "./primitives/schema";
import { object, string, number, boolean, array, any, ZodType } from "zod";
 
export const Item = object({
  external_urls: ExternalUrls,
  followers: Followers,
  genres: array(string()),
  href: string(),
  id: string(),
  images: array(Image),
  name: string(),
  popularity: number(),
  type: string(),
  uri: string()
}).strict();

export const artistSchema = Item;
