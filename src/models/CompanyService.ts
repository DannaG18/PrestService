import { Company } from './Company';
import { Service } from './Service';
import { Branch } from './Branch';

export interface CompanyService {
    embeddedId: {
        company: Company;
        service: Service;
    };
    service: Service;
    branch: Branch;
    serviceValue: number;
}
