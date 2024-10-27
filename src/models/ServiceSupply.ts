import { Service } from "./Service";
import { Supply } from "./Supply";

export interface ServiceSupply {
    embeddedId: {
        supply: Supply;
        service: Service;
    };
    unitValue: number;
    stock: number;
    maxStock: number;
    minStock: number;
}