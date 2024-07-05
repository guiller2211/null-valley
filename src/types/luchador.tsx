import { Resource } from "./resource";
import { ImageData } from "./images";

export interface LuchadorData extends Resource {
  name: string;
  description?: string;
  image: ImageData;
}
