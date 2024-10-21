import { GenericService } from "./GenericService";
import { Supply } from "../models/Supply";

export class SupplyService extends GenericService<Supply, number> {
    constructor() {
            super('http://localhost:8080/api/supply');
    }
}