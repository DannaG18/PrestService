import { GenericService } from "../GenericService";
import { ServiceApproval } from "../../models/ServiceApproval";

export class ServiceApprovalService extends GenericService<ServiceApproval, number> {
    constructor() {
            super('http://localhost:8080/api/service-approvals');
    }
}