import React from 'react';
import GenericList from '../GenericList';
import { CompanyService } from '../../models/CompanyService';
import { CompanyServiceService } from '../../api/services/CompanyServiceService';
import ConfirmationPopup from '../ConfirmationPopup';

const companyServiceService = new CompanyServiceService();

const CompanyServiceList: React.FC = () => {
    const fields = [
        { name: 'embeddedId.company.name', label: 'Company Name', type: 'text' },
        { name: 'embeddedId.service.name', label: 'Service Name', type: 'text' },
        { name: 'branch.branchName', label: 'Branch Name', type: 'text' },
        { name: 'serviceValue', label: 'Service Value', type: 'number' },
    ];

    return (
        <GenericList<CompanyService>
            entityName="CompanyService"
            fields={fields}
            fetchAll={companyServiceService.findAll.bind(companyServiceService)}
            fetchById={companyServiceService.findById.bind(companyServiceService)}
            deleteEntity={companyServiceService.delete.bind(companyServiceService)}
            updateEntity={companyServiceService.update.bind(companyServiceService)}
            itemsPerPage={5}
            ConfirmationPopup={ConfirmationPopup}
        />
    );
};

export default CompanyServiceList;
