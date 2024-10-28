import React from 'react';
import GenericList from '../GenericList';
import { Branch } from '../../models/Branch';
import { BranchService } from '../../api/services/BranchService';
import ConfirmationPopup from '../ConfirmationPopup';

const branchService = new BranchService();

const BranchList: React.FC = () => {
    const fields = [
        { name: 'nit', label: 'NIT', type: 'text' },
        { 
            name: 'company.nameBranch', 
            label: 'Company', 
            type: 'text'
        },
        { 
            name: 'city.nameCity', 
            label: 'City', 
            type: 'text'
        },
        { name: 'nameBranch', label: 'Branch Name', type: 'text' },
        { name: 'creationDate', label: 'Creation Date', type: 'text' }
    ];

    return (
        <GenericList<Branch>
            entityName="Branch"
            fields={fields}
            fetchAll={branchService.findAll.bind(branchService)}
            fetchById={branchService.findById.bind(branchService)}
            deleteEntity={branchService.delete.bind(branchService)}
            updateEntity={branchService.update.bind(branchService)}
            itemsPerPage={5}
            ConfirmationPopup={ConfirmationPopup}
        />
    );
};

export default BranchList;

