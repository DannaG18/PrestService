import { GenericService } from "../GenericService";
import { WorkOrder } from "../../models/WorkOrder";

export class WorkOrderService extends GenericService<WorkOrder, number> {
    constructor() {
            super('http://localhost:8080/api/work-order');
    }
}