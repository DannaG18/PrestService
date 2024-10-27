import { GenericService } from "../GenericService";
import { StatusOrder } from "../../models/StatusOrder";

export class StatusOrderService extends GenericService<StatusOrder, number> {
    constructor() {
            super('http://localhost:8080/api/status-order');
    }
}