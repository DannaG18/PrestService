import { CompanyService } from "../../models/CompanyService";
import { GenericService } from "../GenericService";


/**
 * We extend GenericService and specify the entity type and ID type.
 * This is an example of service with a composite ID.
 */
interface CompanyServiceId {
    companyId: number;
    roleId: number;
}

export class CompanyServiceService extends GenericService<CompanyService, CompanyServiceId> {
    constructor() {
        super('http://localhost:8080/api/companyservice');
    }
}