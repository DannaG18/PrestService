import { CompanyType } from "./CompanyType";

export interface Company {
    id: number;
    nameCompany: string;
    companyType: CompanyType;
}