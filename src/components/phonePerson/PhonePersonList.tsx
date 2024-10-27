import React from 'react';
import GenericList from '../GenericList';
import { PhonePerson } from '../../models/PhonePerson';
import { PhonePersonService } from '../../api/services/PhonePersonService';
import ConfirmationPopup from '../ConfirmationPopup';

const phonePersonService = new PhonePersonService();

const PhonePersonList: React.FC = () => {
    const fields = [
        { name: 'id', label: 'ID', type: 'text' },
        { 
            name: 'documentNumber', 
            label: 'Document Number', 
            type: 'text', 
            render: (pp: PhonePerson) => `${pp.documentNumber.name} ${pp.documentNumber.lastName}` 
        },
        { name: 'phoneType', label: 'Phone Type', type: 'text', render: (pp: PhonePerson) => pp.phoneType.description },
        { name: 'phone', label: 'Phone', type: 'text' }
    ];

    return (
        <GenericList<PhonePerson>
            entityName="Phone Person"
            fields={fields}
            fetchAll={phonePersonService.findAll.bind(phonePersonService)}
            fetchById={phonePersonService.findById.bind(phonePersonService)}
            deleteEntity={phonePersonService.delete.bind(phonePersonService)}
            updateEntity={phonePersonService.update.bind(phonePersonService)}
            itemsPerPage={5}
            ConfirmationPopup={ConfirmationPopup}
        />
    );
};

export default PhonePersonList;
