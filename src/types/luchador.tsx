import { Resource } from "./resource";
import { ImageData } from "./images";

export interface LuchadorData extends Resource {
  name: string;
  description?: string;
  image: ImageData;
  votes?: CommentsData[];
  score?: number;
}

export type CommentsData = {
  comment?: string;
  like?: boolean;
}