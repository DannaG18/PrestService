import { GenericService } from "../GenericService";
import { Region } from "../../models/Region";

export class RegionService extends GenericService<Region, number> {
    constructor() {
            super('http://localhost:8080/api/regions');
    }
}