import { GenericService } from "../GenericService";
import { PersonType } from "../../models/PersonType";

export class PersonTypeService extends GenericService<PersonType, number> {
    constructor() {
            super('http://localhost:8080/api/person-type');
    }
}