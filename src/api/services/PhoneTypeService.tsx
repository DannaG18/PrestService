import { PhoneType } from "../../models/PhoneType";
import { GenericService } from "../GenericService";

export class PhoneTypeService extends GenericService<PhoneType, number> {
    constructor() {
        super('http://localhost:8080/api/phone-type');
    }
}