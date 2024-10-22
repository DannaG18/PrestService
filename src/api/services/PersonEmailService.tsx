import { GenericService } from "../GenericService";
import { PersonEmail } from "../../models/PersonEmail";

export class PersonEmailService extends GenericService<PersonEmail, number> {
    constructor() {
        super('http://localhost:8080/api/email-person');
    }
}