import { GenericService } from "../GenericService";
import { CompanyType } from "../../models/CompanyType";

export class CompanyTypeService extends GenericService<CompanyType, number> {
    constructor() {
        super('http://localhost:8080/api/company-type');
    }
}