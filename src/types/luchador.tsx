import { Resource } from "./resource";
import { ImageData } from "./images";

export interface LuchadorData extends Resource {
  name: string;
  description?: string;
  image: ImageData;
  votes?: CommentsData[];
  score?: number;
  totalDislikes?: number;
}

export type CommentsData = {
  nickName?: string;
  comment?: string;
  like?: boolean;
  image?: ImageData;
}