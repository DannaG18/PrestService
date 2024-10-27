import { GenericService } from "../GenericService";
import { EmailPerson } from "../../models/EmailPerson";

export class EmailPersonService extends GenericService<EmailPerson, number> {
    constructor() {
            super('http://localhost:8080/api/email-person');
    }
}