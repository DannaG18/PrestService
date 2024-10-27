import { GenericService } from "../GenericService";
import { PhoneType } from "../../models/PhoneType";

export class PhoneTypeService extends GenericService<PhoneType, number> {
    constructor() {
            super('http://localhost:8080/api/phone-type');
    }
}