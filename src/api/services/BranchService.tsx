import { GenericService } from "../GenericService";
import { Branch } from "../../models/Branch";

export class BranchService extends GenericService<Branch, number> {
    constructor() {
        super('http://localhost:8080/api/branch');
    }
}
