import { StatusServiceOrder } from "../../models/StatusServiceOrder";
import { GenericService } from "../GenericService";

export class StatusServOrderService extends GenericService<StatusServiceOrder, number> {
    constructor() {
        super('http://localhost:8080/api/status-service-order');
    }
}