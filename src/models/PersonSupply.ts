import { Person } from "./Person";
import { Service } from "./Service";
import { Supply } from "./Supply";

export interface PersonSupplyId {
    person: Person;
    supply: Supply;
}

export interface PersonSupply {
    id: PersonSupplyId;
    supply: Supply;
    documentNumber: Person;
    service: Service;
    description: string;
}