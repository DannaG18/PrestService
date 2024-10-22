import { ServiceApproval } from "../../models/ServiceApproval";
import { GenericService } from "../GenericService";

export class ServApprovalService extends GenericService<ServiceApproval, number> {
    constructor() {
        super('http://localhost:8080/api/service-approval');
    }
}