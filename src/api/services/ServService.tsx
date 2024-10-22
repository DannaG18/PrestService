import { Service } from "../../models/Service";
import { GenericService } from "../GenericService";

export class ServService extends GenericService<Service, number> {
    constructor() {
        super('http://localhost:8080/api/service');
    }
}