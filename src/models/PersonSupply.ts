import { Person } from "./Person";
import { Service } from "./Service";
import { Supply } from "./Supply";

export interface PersonSupply {
    id: number;
    supply: Supply;
    documentNumber: Person;
    service: Service;
    description: string;
}