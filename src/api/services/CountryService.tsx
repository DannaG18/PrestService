import { GenericService } from "../GenericService";
import { Country } from "../../models/Country";

export class CountryService extends GenericService<Country, number> {
    constructor() {
        super('http://localhost:8080/api/country');
    }
}