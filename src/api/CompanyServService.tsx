import { CompanyService } from "../models/CompanyService";
import { ReusableService } from "./ReusableService";


/**
 * We extend ReusableService and specify the entity type and ID type.
 * This is an example of service with a composite ID.
 */
interface CompanyServiceId {
    companyId: number;
    roleId: number;
}

export class CompanyServService extends ReusableService<CompanyService, CompanyServiceId> {
    constructor() {
        super('http://localhost:8080/api/companyservice');
    }
}