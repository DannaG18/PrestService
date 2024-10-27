import { GenericService } from "../GenericService";
import { OrderDetail } from "../../models/OrderDetail";

export class OrderDetailService extends GenericService<OrderDetail, number> {
    constructor() {
            super('http://localhost:8080/api/order-detail');
    }
}