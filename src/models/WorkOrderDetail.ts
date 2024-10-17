import { Service } from "./Service";
import { StatusServiceOrder } from "./StatusServiceOrder";
import { WorkOrder } from "./WorkOrder";

export interface WorkOrderDetail {
    id: number;
    assignedService: Service;
    date: string;
    workOrder: WorkOrder;
    statusServiceOrder: StatusServiceOrder;
}