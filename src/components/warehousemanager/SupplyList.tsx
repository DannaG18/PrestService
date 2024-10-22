import React from 'react';
import GenericList from '../GenericList';
import { Supply } from '../../models/Supply';
import { SupplyService } from '../../api/services/SupplyService';
import ConfirmationPopup from '../ConfirmationPopup';

// Instancia del servicio
const supplyService = new SupplyService();

const SupplyListPage: React.FC = () => {
    const fields = [
        { name: 'id', label: 'ID', type: 'text' },
        { name: 'codInternal', label: 'Internal Code', type: 'text' },
        { name: 'supplyName', label: 'Supply Name', type: 'text' }
    ];

    return (
        <GenericList<Supply>
            entityName="Supply"
            fields={fields}
            fetchAll={supplyService.findAll.bind(supplyService)}
            fetchById={supplyService.findById.bind(supplyService)}
            deleteEntity={supplyService.delete.bind(supplyService)}
            updateEntity={supplyService.update.bind(supplyService)}
            itemsPerPage={5}
            ConfirmationPopup={ConfirmationPopup}
        />
    );
};

export default SupplyListPage;