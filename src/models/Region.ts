import { Country } from "./Country";

export interface Region {
    id: number;
    country: Country;
    nameRegion: string;
}