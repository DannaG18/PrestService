import { ApprovalStatus } from "./ApprovalStatus";
import { Person } from "./Person";
import { Service } from "./Service";
import { WorkOrder } from "./WorkOrder";

export interface ServiceApproval {
    id: number;
    workOrder: WorkOrder;
    clientId: Person;
    service: Service;
    approvalStatus: ApprovalStatus;
    issueDescription: string;
    solutionDescription: string;
}