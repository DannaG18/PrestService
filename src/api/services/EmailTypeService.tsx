import { GenericService } from "../GenericService";
import { EmailType } from "../../models/EmailType";

export class EmailTypeService extends GenericService<EmailType, number> {
    constructor() {
            super('http://localhost:8080/api/email-type');
    }
}