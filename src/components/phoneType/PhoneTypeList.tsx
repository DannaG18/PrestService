import React from 'react';
import GenericList from '../GenericList';
import { PhoneType } from '../../models/PhoneType';
import { PhoneTypeService } from '../../api/services/PhoneTypeService';
import ConfirmationPopup from '../ConfirmationPopup';

const phoneTypeService = new PhoneTypeService();

const PhoneTypeList: React.FC = () => {
    const fields = [
        { name: 'id', label: 'ID', type: 'text' },
        { name: 'description', label: 'Description', type: 'text' }
    ];

    return (
        <GenericList<PhoneType>
            entityName="Phone Type"
            fields={fields}
            fetchAll={phoneTypeService.findAll.bind(phoneTypeService)}
            fetchById={phoneTypeService.findById.bind(phoneTypeService)}
            deleteEntity={phoneTypeService.delete.bind(phoneTypeService)}
            updateEntity={phoneTypeService.update.bind(phoneTypeService)}
            itemsPerPage={5}
            ConfirmationPopup={ConfirmationPopup}
        />
    );
};

export default PhoneTypeList;
