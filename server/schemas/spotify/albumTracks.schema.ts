import { Response } from "../shared/response.schema";
import { pagingObject } from "./primitives/schema";
import { object, string, number, boolean, array, any, ZodType } from "zod";
import { Item } from './album.schema' 
 

export const albumTracksSchema = pagingObject(Item);
