import React from 'react';
import GenericList from '../GenericList';
import { Company } from '../../models/Company';
import { CompanyService } from '../../api/services/CompanyService';
import ConfirmationPopup from '../ConfirmationPopup';

const companyService = new CompanyService();

const CompanyList: React.FC = () => {
    const fields = [
        { name: 'id', label: 'ID', type: 'text' },
        { name: 'nameCompany', label: 'Company Name', type: 'text' },
        { name: 'companyType.name', label: 'Company Type', type: 'text' } // Mostrar el nombre del tipo de compañía
    ];

    return (
        <GenericList<Company>
            entityName="Company"
            fields={fields}
            fetchAll={companyService.findAll.bind(companyService)}
            fetchById={companyService.findById.bind(companyService)}
            deleteEntity={companyService.delete.bind(companyService)}
            updateEntity={companyService.update.bind(companyService)}
            itemsPerPage={5}
            ConfirmationPopup={ConfirmationPopup}
        />
    );
};

export default CompanyList;
