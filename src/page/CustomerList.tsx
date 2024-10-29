import React from 'react';
import GenericList from '../components/GenericList';
import ConfirmationPopup from '../components/ConfirmationPopup';
import { PersonSupplyService } from '../api/services/PersonSupplyService';
import { PersonSupply } from '../models/PersonSupply';

// Instance of the service
const personSupplyService = new PersonSupplyService();

const CustomerList: React.FC = () => {
    // Define fields including those for composite IDs
    const fields = [
        { name: 'id.person.name', label: 'Person Name in ID', type: 'text' },
        { name: 'id.supply.supplyName', label: 'Supply Name in ID', type: 'text' },
        { name: 'supply.supplyName', label: 'Supply Name', type: 'text' },
        { name: 'documentNumber.name', label: 'Document Number', type: 'text' },
        { name: 'service.name', label: 'Service Name', type: 'text' },
        { name: 'description', label: 'Description', type: 'text' },
    ];

    return (
        <GenericList<PersonSupply>
            entityName="Person Supply"
            fields={fields}
            fetchAll={personSupplyService.findAll.bind(personSupplyService)}
            fetchById={personSupplyService.findById.bind(personSupplyService)} // Ensure this method handles string/number IDs
            deleteEntity={personSupplyService.delete.bind(personSupplyService)} // Ensure this method handles string/number IDs
            updateEntity={personSupplyService.update.bind(personSupplyService)} // Ensure this method handles string/number IDs
            itemsPerPage={5}
            ConfirmationPopup={ConfirmationPopup}
        />
    );
};

export default CustomerList;
