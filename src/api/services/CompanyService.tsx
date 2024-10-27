import { GenericService } from "../GenericService";
import { Company } from "../../models/Company";

export class CompanyService extends GenericService<Company, number> {
    constructor() {
            super('http://localhost:8080/api/company');
    }
}