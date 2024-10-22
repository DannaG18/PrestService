import { Region } from "../../models/Region";
import { GenericService } from "../GenericService";

export class RegionService extends GenericService<Region, string> {
    constructor() {
        super('http://localhost:8080/api/region');
    }
}