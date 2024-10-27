import React from 'react';
import GenericList from '../GenericList';
import { ServiceOrder } from '../../models/ServiceOrder';
import { ServiceOrderService } from '../../api/services/ServiceOrderService';
import ConfirmationPopup from '../ConfirmationPopup';

const serviceOrderService = new ServiceOrderService();

const ServiceOrderList: React.FC = () => {
    const fields = [
        { name: 'nroOrden', label: 'Order Number', type: 'text' },
        { 
            name: 'clientId', 
            label: 'Client', 
            type: 'text', 
            accessor: (order: ServiceOrder) => `${order.clientId.name} ${order.clientId.lastName}` 
        },
        { 
            name: 'employeeId', 
            label: 'Employee', 
            type: 'text', 
            accessor: (order: ServiceOrder) => `${order.employeeId.name} ${order.employeeId.lastName}` 
        },
        { 
            name: 'orderStatus', 
            label: 'Status', 
            type: 'text', 
            accessor: (order: ServiceOrder) => `Order #${order.orderStatus.name}` 
        },
        { name: 'orderDate', label: 'Order Date', type: 'text' }
    ];

    return (
        <GenericList<ServiceOrder>
            entityName="ServiceOrder"
            fields={fields}
            fetchAll={serviceOrderService.findAll.bind(serviceOrderService)}
            fetchById={serviceOrderService.findById.bind(serviceOrderService)}
            deleteEntity={serviceOrderService.delete.bind(serviceOrderService)}
            updateEntity={serviceOrderService.update.bind(serviceOrderService)}
            itemsPerPage={5}
            ConfirmationPopup={ConfirmationPopup}
        />
    );
};

export default ServiceOrderList;


