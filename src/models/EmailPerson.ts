import { EmailType } from "./EmailType";
import { Person } from "./Person";

export interface EmailPerson {
    id: number;
    email: string;
    documentNumber: Person;
    emailType: EmailType;
}