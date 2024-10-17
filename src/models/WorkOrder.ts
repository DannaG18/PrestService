import { Person } from "./Person";
import { ServiceOrder } from "./ServiceOrder";

export interface WorkOrder {
    id: number;
    assignamentDate: string;
    assignamentHour: string;
    employeeId: Person;
    serviceOrder: ServiceOrder;
}