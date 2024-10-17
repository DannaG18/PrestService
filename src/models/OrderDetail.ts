import { Service } from "./Service";
import { ServiceOrder } from "./ServiceOrder";

export interface OrderDetail {
    id: number;
    serviceValue: number;
    service: Service;
    serviceOrder: ServiceOrder;
}