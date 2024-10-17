import { Person } from "./Person";
import { PhoneType } from "./PhoneType";

export interface PhonePerson {
    id: number;
    documentNumber: Person;
    phoneType: PhoneType;
    phone: string;
}