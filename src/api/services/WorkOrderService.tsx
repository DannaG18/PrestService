import { WorkOrder } from "../../models/WorkOrder";
import { GenericService } from "../GenericService";

export class WorkOrderService extends GenericService<WorkOrder, number> {
    constructor() {
        super('http://localhost:8080/api/work-order')
    }
}