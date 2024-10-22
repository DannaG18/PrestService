import { PersonType } from "../../models/PersonType";
import { GenericService } from "../GenericService";

export class PersonTypeService extends GenericService<PersonType, number> {
    constructor() {
        super('http://localhost:8080/api/person-type');
    }
}