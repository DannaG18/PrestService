import { GenericService } from "../GenericService";
import { OrderStatus } from "../../models/OrderStatus";

export class OrderStatusService extends GenericService<OrderStatus, number> {
    constructor() {
        super('http://localhost:8080/api/order-status');
    }
}