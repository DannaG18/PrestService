import { CompanyType } from "./CompanyType";

export interface Company {
    id: number;
    name: string;
    companyType: CompanyType;
}