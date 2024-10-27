import { GenericService } from "../GenericService";
import { StatusServiceOrder } from "../../models/StatusServiceOrder";

export class StatusServiceOrderService extends GenericService<StatusServiceOrder, number> {
    constructor() {
            super('http://localhost:8080/api/status-service-order');
    }
}