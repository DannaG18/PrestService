import { EmailType } from "./EmailType";
import { Person } from "./Person";

export interface PersonEmail {
    id: number;
    email: string;
    documentNumber: Person;
    emailType: EmailType;
}