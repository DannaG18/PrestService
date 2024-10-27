import React from 'react';
import GenericList from '../GenericList';
import { WorkOrder } from '../../models/WorkOrder';
import { WorkOrderService } from '../../api/services/WorkOrderService';
import ConfirmationPopup from '../ConfirmationPopup';

const workOrderService = new WorkOrderService();

const WorkOrderList: React.FC = () => {
    const fields = [
        { name: 'id', label: 'ID', type: 'text' },
        { name: 'assignamentDate', label: 'Assignment Date', type: 'text' },
        { name: 'assignamentHour', label: 'Assignment Hour', type: 'text' },
        { name: 'employeeId', label: 'Employee', type: 'text', accessor: (order: WorkOrder) => `${order.employeeId.name} ${order.employeeId.lastName}` },
        { name: 'serviceOrder', label: 'Service Order', type: 'text', accessor: (order: WorkOrder) => `Order #${order.serviceOrder.nroOrden}` }
    ];

    return (
        <GenericList<WorkOrder>
            entityName="WorkOrder"
            fields={fields}
            fetchAll={workOrderService.findAll.bind(workOrderService)}
            fetchById={workOrderService.findById.bind(workOrderService)}
            deleteEntity={workOrderService.delete.bind(workOrderService)}
            updateEntity={workOrderService.update.bind(workOrderService)}
            itemsPerPage={5}
            ConfirmationPopup={ConfirmationPopup}
        />
    );
};

export default WorkOrderList;