import React from 'react';
import GenericList from '../GenericList';
import { EmailType } from '../../models/EmailType';
import { EmailTypeService } from '../../api/services/EmailTypeService';
import ConfirmationPopup from '../ConfirmationPopup';

const emailTypeService = new EmailTypeService();

const EmailTypeList: React.FC = () => {
    const fields = [
        { name: 'name', label: 'Name', type: 'text' },
    ];

    return (
        <GenericList<EmailType>
            entityName="EmailType"
            fields={fields}
            fetchAll={emailTypeService.findAll.bind(emailTypeService)}
            fetchById={emailTypeService.findById.bind(emailTypeService)}
            deleteEntity={emailTypeService.delete.bind(emailTypeService)}
            updateEntity={emailTypeService.update.bind(emailTypeService)} 
            itemsPerPage={5}
            ConfirmationPopup={ConfirmationPopup}
        />
    );
};

export default EmailTypeList;
