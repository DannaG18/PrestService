import { ApprovalStatus } from '../models/ApprovalStatus';
import { GenericService } from './GenericService';

/**
 * We extend GenericService and specify the entity type and ID type.
 * This is an example of service with a single ID.
 */
export class ApprovalStatusService extends GenericService<ApprovalStatus, number> {
    constructor() {
        super('http://localhost:8080/api/approvalstatus');
    }
}