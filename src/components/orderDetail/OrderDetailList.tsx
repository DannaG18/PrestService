import React from 'react';
import GenericList from '../GenericList';
import { OrderDetail } from '../../models/OrderDetail';
import { OrderDetailService } from '../../api/services/OrderDetailService';
import ConfirmationPopup from '../ConfirmationPopup';

const orderDetailService = new OrderDetailService();

const OrderDetailList: React.FC = () => {
    const fields = [
        { name: 'service.name', label: 'Service', type: 'text' }, 
        { name: 'serviceOrder.nroOrden', label: 'Order Number', type: 'text' }, 
        { name: 'serviceValue', label: 'Value', type: 'number' }, 
    ];

    return (
        <GenericList<OrderDetail>
            entityName="OrderDetail"
            fields={fields}
            fetchAll={orderDetailService.findAll.bind(orderDetailService)}
            fetchById={orderDetailService.findById.bind(orderDetailService)}
            deleteEntity={orderDetailService.delete.bind(orderDetailService)}
            updateEntity={orderDetailService.update.bind(orderDetailService)} 
            itemsPerPage={5}
            ConfirmationPopup={ConfirmationPopup}
        />
    );
};

export default OrderDetailList;

