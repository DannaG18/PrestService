import { OrderStatus } from "./OrderStatus";
import { Person } from "./Person";

export interface ServiceOrder {
    nroOrden: number;
    clientId: Person;
    employeeId: Person;
    orderStatus: OrderStatus;
    orderDate: string;
}