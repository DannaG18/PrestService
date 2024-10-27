import { GenericService } from "../GenericService";
import { PersonSupply } from "../../models/PersonSupply";

export class PersonSupplyService extends GenericService<PersonSupply, number> {
    constructor() {
            super('http://localhost:8080/api/person-supply');
    }
}