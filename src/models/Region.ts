import { Country } from "./Country";

export interface Region {
    id: string;
    country: Country;
    regionName: string;
}