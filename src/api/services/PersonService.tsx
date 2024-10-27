import { GenericService } from "../GenericService";
import { Person } from "../../models/Person";

export class PersonService extends GenericService<Person, string> {
    constructor() {
            super('http://localhost:8080/api/persons');
    }
}