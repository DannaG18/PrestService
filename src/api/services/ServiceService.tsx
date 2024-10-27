import { GenericService } from "../GenericService";
import { Service } from "../../models/Service";

export class ServiceService extends GenericService<Service, number> {
    constructor() {
            super('http://localhost:8080/api/service');
    }
}