import { Service } from "./Service";
import { Supply } from "./Supply";

export interface SupplyService {
    embeddedId: {
        supply: Supply;
        service: Service;
    };
    unitValue: number;
    stock: number;
    maxStock: number;
    minStock: number;
}