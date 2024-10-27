import React from 'react';
import GenericList from '../GenericList';
import { WorkOrderDetails } from '../../models/WorkOrderDetails';
import { WorkOrderDetailsService } from '../../api/services/WorkOrderDetailsService';
import ConfirmationPopup from '../ConfirmationPopup';

const workOrderDetailsService = new WorkOrderDetailsService();

const WorkOrderDetailsList: React.FC = () => {
    const fields = [
        { name: 'id', label: 'ID', type: 'text' },
        { name: 'assignedService', label: 'Assigned Service', type: 'text', accessor: (details: WorkOrderDetails) => details.assignedService.name },
        { name: 'date', label: 'Date', type: 'text' },
        { name: 'workOrder', label: 'Work Order', type: 'text', accessor: (details: WorkOrderDetails) => details.workOrder.id },
        { name: 'statusServiceOrder', label: 'Status', type: 'text', accessor: (details: WorkOrderDetails) => details.statusServiceOrder.name }
    ];

    return (
        <GenericList<WorkOrderDetails>
            entityName="WorkOrderDetails"
            fields={fields}
            fetchAll={workOrderDetailsService.findAll.bind(workOrderDetailsService)}
            fetchById={workOrderDetailsService.findById.bind(workOrderDetailsService)}
            deleteEntity={workOrderDetailsService.delete.bind(workOrderDetailsService)}
            updateEntity={workOrderDetailsService.update.bind(workOrderDetailsService)}
            itemsPerPage={5}
            ConfirmationPopup={ConfirmationPopup}
        />
    );
};

export default WorkOrderDetailsList;
