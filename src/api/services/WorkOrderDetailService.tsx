import { WorkOrderDetail } from "../../models/WorkOrderDetail";
import { GenericService } from "../GenericService";

export class WorkOrderDetailService extends GenericService<WorkOrderDetail, number> {
    constructor() {
        super('http://localhost:8080/api/work-order-details');
    }
}