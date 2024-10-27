import React from 'react';
import GenericList from '../GenericList';
import { EmailPerson } from '../../models/EmailPerson';
import { EmailPersonService } from '../../api/services/EmailPersonService';
import ConfirmationPopup from '../ConfirmationPopup';

const emailPersonService = new EmailPersonService();

const EmailPersonList: React.FC = () => {
    const fields = [
        { name: 'id', label: 'ID', type: 'text' },
        { name: 'email', label: 'Email', type: 'text' },
        { name: 'documentNumber.name', label: 'Person', type: 'text' },
        { name: 'emailType.name', label: 'Email Type', type: 'text' },
    ];

    return (
        <GenericList<EmailPerson>
            entityName="EmailPerson"
            fields={fields}
            fetchAll={emailPersonService.findAll.bind(emailPersonService)}
            fetchById={emailPersonService.findById.bind(emailPersonService)}
            deleteEntity={emailPersonService.delete.bind(emailPersonService)}
            updateEntity={emailPersonService.update.bind(emailPersonService)} 
            itemsPerPage={5}
            ConfirmationPopup={ConfirmationPopup}
        />
    );
};

export default EmailPersonList;

