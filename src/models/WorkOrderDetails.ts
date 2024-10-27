import { Service } from "./Service";
import { StatusServiceOrder } from "./StatusServiceOrder";
import { WorkOrder } from "./WorkOrder";

export interface WorkOrderDetails {
    id: number;
    assignedService: Service;
    date: string;
    workOrder: WorkOrder;
    statusServiceOrder: StatusServiceOrder;
}