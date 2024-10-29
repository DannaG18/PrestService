import { GenericService } from "../GenericService";
import { PersonSupply } from "../../models/PersonSupply";
import { PersonSupplyId } from "../../models/PersonSupply";
export class PersonSupplyService extends GenericService<PersonSupply, PersonSupplyId> {
    constructor() {
            super('http://localhost:8080/api/person-supplies');
    }
}