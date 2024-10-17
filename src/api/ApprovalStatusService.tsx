import { ApprovalStatus } from '../models/ApprovalStatus';
import { ReusableService } from './ReusableService';

/**
 * We extend ReusableService and specify the entity type and ID type.
 * This is an example of service with a single ID.
 */
export class CountryService extends ReusableService<ApprovalStatus, number> {
    constructor() {
        super('http://localhost:8080/api/approvalstatus');
    }
}