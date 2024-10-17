import { Region } from "./Region";

export interface City {
    id: number;
    region: Region;
    cityName: string;
}