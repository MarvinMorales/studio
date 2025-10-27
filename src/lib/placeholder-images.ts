import data from './data.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

// This file is now empty as all data is sourced from data.json
export const PlaceHolderImages: ImagePlaceholder[] = [];
