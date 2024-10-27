import { StatusOrder } from "./StatusOrder";
import { Person } from "./Person";

export interface ServiceOrder {
    nroOrden: number;
    clientId: Person;
    employeeId: Person;
    orderStatus: StatusOrder;
    orderDate: string;
}