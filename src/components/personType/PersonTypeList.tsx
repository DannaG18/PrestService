import React from 'react';
import GenericList from '../GenericList';
import { PersonType } from '../../models/PersonType';
import { PersonTypeService } from '../../api/services/PersonTypeService';
import ConfirmationPopup from '../ConfirmationPopup';

const personTypeService = new PersonTypeService();

const PersonTypeList: React.FC = () => {
    const fields = [
        { name: 'id', label: 'ID', type: 'text' },
        { name: 'namePersonType', label: 'Name', type: 'text' },
    ];

    return (
        <GenericList<PersonType>
            entityName="Person Type"
            fields={fields}
            fetchAll={personTypeService.findAll.bind(personTypeService)}
            fetchById={personTypeService.findById.bind(personTypeService)}
            deleteEntity={personTypeService.delete.bind(personTypeService)}
            updateEntity={personTypeService.update.bind(personTypeService)}
            itemsPerPage={5}
            ConfirmationPopup={ConfirmationPopup}
        />
    );
};

export default PersonTypeList;
