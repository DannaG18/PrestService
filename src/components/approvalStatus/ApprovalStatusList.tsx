import React from 'react';
import GenericList from '../GenericList';
import { ApprovalStatus } from '../../models/ApprovalStatus';
import { ApprovalStatusService } from '../../api/services/ApprovalStatusService';
import ConfirmationPopup from '../ConfirmationPopup';

const approvalStatusService = new ApprovalStatusService();

const ApprovalStatusList: React.FC = () => {
    const fields = [
        { name: 'id', label: 'ID', type: 'text' },
        { name: 'name', label: 'Approval Status Name', type: 'text' }
    ];

    return (
        <GenericList<ApprovalStatus>
            entityName="Approval Status"
            fields={fields}
            fetchAll={approvalStatusService.findAll.bind(approvalStatusService)}
            fetchById={approvalStatusService.findById.bind(approvalStatusService)}
            deleteEntity={approvalStatusService.delete.bind(approvalStatusService)}
            updateEntity={approvalStatusService.update.bind(approvalStatusService)}
            itemsPerPage={5}
            ConfirmationPopup={ConfirmationPopup}
        />
    );
};

export default ApprovalStatusList;
