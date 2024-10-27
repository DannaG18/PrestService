import { GenericService } from "../GenericService";
import { City } from "../../models/City";

export class CityService extends GenericService<City, number> {
    constructor() {
            super('http://localhost:8080/api/city');
    }
}