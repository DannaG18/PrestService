import { GenericService } from "../GenericService";
import { ServiceOrder } from "../../models/ServiceOrder";

export class ServiceOrderService extends GenericService<ServiceOrder, number> {
    constructor() {
            super('http://localhost:8080/api/service-order');
    }
}