import React from 'react';
import GenericList from '../GenericList';
import { DocumentType } from '../../models/DocumentType';
import { DocumentTypeService } from '../../api/services/DocumentTypeService';
import ConfirmationPopup from '../ConfirmationPopup';

const documentTypeService = new DocumentTypeService();

const DocumentTypeList: React.FC = () => {
    const fields = [
        { name: 'id', label: 'ID', type: 'text' },
        { name: 'nameDocumentType', label: 'Name', type: 'text' },
    ];

    return (
        <GenericList<DocumentType>
            entityName="DocumentType"
            fields={fields}
            fetchAll={documentTypeService.findAll.bind(documentTypeService)}
            fetchById={documentTypeService.findById.bind(documentTypeService)}
            deleteEntity={documentTypeService.delete.bind(documentTypeService)}
            updateEntity={documentTypeService.update.bind(documentTypeService)}
            itemsPerPage={5}
            ConfirmationPopup={ConfirmationPopup}
        />
    );
};

export default DocumentTypeList;
