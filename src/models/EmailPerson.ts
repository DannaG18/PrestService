import { EmailType } from "./EmailType";
import { Person } from "./Person";

export interface EmailPerson {
    id: number;
    documentNumber: Person;
    emailType: EmailType;
    email: string;
}