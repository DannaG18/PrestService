import { GenericService } from "../GenericService";
import { PhonePerson } from "../../models/PhonePerson";

export class PhonePersonService extends GenericService<PhonePerson, number> {
    constructor() {
        super('http://localhost:8080/api/phone-person');
    }
}