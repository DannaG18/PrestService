import { GenericService } from "../GenericService";
import { WorkOrderDetails } from "../../models/WorkOrderDetails";

export class WorkOrderDetailsService extends GenericService<WorkOrderDetails, number> {
    constructor() {
            super('http://localhost:8080/api/work-order-details');
    }
}