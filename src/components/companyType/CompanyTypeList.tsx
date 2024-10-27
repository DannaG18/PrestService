import React from 'react';
import GenericList from '../GenericList';
import { CompanyType } from '../../models/CompanyType';
import { CompanyTypeService } from '../../api/services/CompanyTypeService';
import ConfirmationPopup from '../ConfirmationPopup';

const companyTypeService = new CompanyTypeService();

const CompanyTypeList: React.FC = () => {
    const fields = [
        { name: 'id', label: 'ID', type: 'text' },
        { name: 'description', label: 'Description', type: 'text' }
    ];

    return (
        <GenericList<CompanyType>
            entityName="CompanyType"
            fields={fields}
            fetchAll={companyTypeService.findAll.bind(companyTypeService)}
            fetchById={companyTypeService.findById.bind(companyTypeService)}
            deleteEntity={companyTypeService.delete.bind(companyTypeService)}
            updateEntity={companyTypeService.update.bind(companyTypeService)}
            itemsPerPage={5}
            ConfirmationPopup={ConfirmationPopup}
        />
    );
};

export default CompanyTypeList;
