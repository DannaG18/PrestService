import { Company } from "./Company";
import { City } from "./City";

export interface Branch {
    id: number;
    nit: string;
    company: Company;
    city: City;
    nameBranch: string;
    creationDate: string;
}