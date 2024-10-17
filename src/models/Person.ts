import { Branch } from "./Branch";
import { DocumentType } from "./DocumentType";
import { PersonType } from "./PersonType";

export interface Person {
    documentNumber: string;
    name: string;
    lastName: string;
    registrationDate: string; //ask
    personType: PersonType;
    documentType: DocumentType;
    branch: Branch;

}