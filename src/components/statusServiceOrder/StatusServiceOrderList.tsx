import React from 'react';
import GenericList from '../GenericList';
import { StatusServiceOrder } from '../../models/StatusServiceOrder';
import { StatusServiceOrderService } from '../../api/services/StatusServiceOrderService';
import ConfirmationPopup from '../ConfirmationPopup';

const statusServiceOrderService = new StatusServiceOrderService();

const StatusServiceOrderList: React.FC = () => {
    const fields = [
        { name: 'id', label: 'Status ID', type: 'text' },
        { name: 'name', label: 'Status Name', type: 'text' }
    ];

    return (
        <GenericList<StatusServiceOrder>
            entityName="StatusServiceOrder"
            fields={fields}
            fetchAll={statusServiceOrderService.findAll.bind(statusServiceOrderService)}
            fetchById={statusServiceOrderService.findById.bind(statusServiceOrderService)}
            deleteEntity={statusServiceOrderService.delete.bind(statusServiceOrderService)}
            updateEntity={statusServiceOrderService.update.bind(statusServiceOrderService)}
            itemsPerPage={5}
            ConfirmationPopup={ConfirmationPopup}
        />
    );
};

export default StatusServiceOrderList;