import { Person } from "./Person";
import { PhoneType } from "./PhoneType";

export interface PhonePerson {
    id: number;
    documentNumber: Person;
    phoneTypeId: PhoneType;
    phone: string;
}