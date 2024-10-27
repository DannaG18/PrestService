import React from 'react';
import GenericList from '../GenericList';
import { ServiceApproval } from '../../models/ServiceApproval';
import { ServiceApprovalService } from '../../api/services/ServiceApprovalService';
import ConfirmationPopup from '../ConfirmationPopup';

const serviceApprovalService = new ServiceApprovalService();

const ServiceApprovalList: React.FC = () => {
    const fields = [
        { name: 'id', label: 'ID', type: 'text' },
        { name: 'workOrder.id', label: 'Work Order', type: 'text' },
        { name: 'clientId.name', label: 'Client', type: 'text' },
        { name: 'service.name', label: 'Service', type: 'text' },
        { name: 'approvalStatus.name', label: 'Status', type: 'text' },
        { name: 'issueDescription', label: 'Issue Description', type: 'text' },
        { name: 'solutionDescription', label: 'Solution Description', type: 'text' }
    ];

    return (
        <GenericList<ServiceApproval>
            entityName="ServiceApproval"
            fields={fields}
            fetchAll={serviceApprovalService.findAll.bind(serviceApprovalService)}
            fetchById={serviceApprovalService.findById.bind(serviceApprovalService)}
            deleteEntity={serviceApprovalService.delete.bind(serviceApprovalService)}
            updateEntity={serviceApprovalService.update.bind(serviceApprovalService)}
            itemsPerPage={5}
            ConfirmationPopup={ConfirmationPopup}
        />
    );
};

export default ServiceApprovalList;

