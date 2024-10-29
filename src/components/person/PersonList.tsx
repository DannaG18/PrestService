import React from 'react';
import GenericList from '../GenericList';
import { Person } from '../../models/Person';
import { PersonService } from '../../api/services/PersonService';
import ConfirmationPopup from '../ConfirmationPopup';

const personService = new PersonService();

const PersonList: React.FC = () => {
    const fields = [
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'lastName', label: 'Last Name', type: 'text' },
        { name: 'documentNumber', label: 'Document Number', type: 'text' },
        { name: 'registrationDate', label: 'Registration Date', type: 'date' },
        { name: 'personType.namePersonType', label: 'Person Type', type: 'text' }, // Accediendo al nombre del tipo de persona
        { name: 'documentType.name', label: 'Document Type', type: 'text' }, // Accediendo al nombre del tipo de documento
        { name: 'branch.nameBranch', label: 'Branch', type: 'text' }, // Accediendo al nombre de la sucursal
    ];

    return (
        <GenericList<Person>
            entityName="Person"
            fields={fields}
            fetchAll={personService.findAll.bind(personService)}
            fetchById={personService.findById.bind(personService)}
            deleteEntity={personService.delete.bind(personService)}
            updateEntity={personService.update.bind(personService)} 
            itemsPerPage={5}
            ConfirmationPopup={ConfirmationPopup}
        />
    );
};

export default PersonList;


