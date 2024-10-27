import React from 'react';
import GenericList from '../GenericList';
import { StatusOrder } from '../../models/StatusOrder';
import { StatusOrderService } from '../../api/services/StatusOrderService';
import ConfirmationPopup from '../ConfirmationPopup';

const statusOrderService = new StatusOrderService();

const StatusOrderList: React.FC = () => {
    const fields = [
        { name: 'id', label: 'Status ID', type: 'text' },
        { name: 'name', label: 'Status Name', type: 'text' }
    ];

    return (
        <GenericList<StatusOrder>
            entityName="StatusOrder"
            fields={fields}
            fetchAll={statusOrderService.findAll.bind(statusOrderService)}
            fetchById={statusOrderService.findById.bind(statusOrderService)}
            deleteEntity={statusOrderService.delete.bind(statusOrderService)}
            updateEntity={statusOrderService.update.bind(statusOrderService)}
            itemsPerPage={5}
            ConfirmationPopup={ConfirmationPopup}
        />
    );
};

export default StatusOrderList;

