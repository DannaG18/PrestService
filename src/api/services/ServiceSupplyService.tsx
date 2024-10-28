import { GenericService } from "../GenericService";
import { ServiceSupply } from "../../models/ServiceSupply";

export class ServiceSupplyService extends GenericService<ServiceSupply, number> {
    constructor() {
            super('http://localhost:8080/api/service-supplies');
    }
}