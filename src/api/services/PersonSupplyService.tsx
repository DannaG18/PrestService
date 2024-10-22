import { PersonSupply } from "../../models/PersonSupply";
import { GenericService } from "../GenericService";

export class PersonSupplyService extends GenericService<PersonSupply, number> {
    constructor() {
        super('http://localhost:8080/api/person-supply');
    }
}