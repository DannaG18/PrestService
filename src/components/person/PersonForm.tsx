import React, { useState, useEffect } from 'react';
import FormComponent from '../GenericForm';
import { Person } from '../../models/Person';
import { PersonService } from '../../api/services/PersonService';
import { DocumentTypeService } from '../../api/services/DocumentTypeService';
import { PersonTypeService } from '../../api/services/PersonTypeService';
import { BranchService } from '../../api/services/BranchService';
import { PersonType } from '../../models/PersonType';
import { Branch } from '../../models/Branch';
import { DocumentType } from '../../models/DocumentType';

const PersonForm: React.FC<{ onView: () => void }> = ({ onView }) => {
    const initialData: Person = {
        documentNumber: '',
        name: '',
        lastName: '',
        registrationDate: '', 
        personType: {} as PersonType,
        documentType: {} as DocumentType,
        branch: {} as Branch
    };

    const [formData, setFormData] = useState<Person>(initialData);
    const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([]);
    const [personTypes, setPersonTypes] = useState<PersonType[]>([]);
    const [branches, setBranches] = useState<Branch[]>([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ submit?: string }>({});
    const personService = new PersonService();
    const documentTypeService = new DocumentTypeService();
    const personTypeService = new PersonTypeService();
    const branchService = new BranchService();

    useEffect(() => {
        const fetchDocumentTypes = async () => {
            try {
                const fetchedDocumentTypes = await documentTypeService.findAll();
                setDocumentTypes(fetchedDocumentTypes);
            } catch (error) {
                console.error('Error fetching document types:', error);
            }
        };

        const fetchPersonTypes = async () => {
            try {
                const fetchedPersonTypes = await personTypeService.findAll();
                setPersonTypes(fetchedPersonTypes);
            } catch (error) {
                console.error('Error fetching person types:', error);
            }
        };

        const fetchBranches = async () => {
            try {
                const fetchedBranches = await branchService.findAll();
                setBranches(fetchedBranches);
            } catch (error) {
                console.error('Error fetching branches:', error);
            }
        };

        fetchDocumentTypes();
        fetchPersonTypes();
        fetchBranches();
    }, []);

    const handleChange = (name: keyof Person, value: any) => {
        if (name === 'personType') {
            const selectedPersonType = personTypes.find(type => type.id.toString() === value);
            if (selectedPersonType) {
                setFormData(prev => ({
                    ...prev,
                    personType: selectedPersonType
                }));
            }
        } else if (name === 'documentType') {
            const selectedDocumentType = documentTypes.find(type => type.id.toString() === value);
            if (selectedDocumentType) {
                setFormData(prev => ({
                    ...prev,
                    documentType: selectedDocumentType
                }));
            }
        } else if (name === 'branch') {
            const selectedBranch = branches.find(branch => branch.id === value);
            if (selectedBranch) {
                setFormData(prev => ({
                    ...prev,
                    branch: selectedBranch
                }));
            }
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (data: Person) => {
        setLoading(true);
        setErrors({});
        try {
            await personService.create(data);
            onView();
        } catch (error) {
            console.error('Error submitting form:', error);
            setErrors({ submit: 'Failed to save person. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const fields = [
        {
            name: 'documentNumber' as const,
            type: 'text',
            label: 'Document Number',
            required: true
        },
        {
            name: 'name' as const,
            type: 'text',
            label: 'Name',
            required: true
        },
        {
            name: 'lastName' as const,
            type: 'text',
            label: 'Last Name',
            required: true
        },
        {
            name: 'registrationDate' as const,
            type: 'date',
            label: 'Registration Date',
            required: true
        },
        {
            name: 'personType' as const,
            type: 'select',
            label: 'Person Type',
            required: true,
            options: personTypes.map(type => ({
                value: type.id.toString(),
                label: type.name
            }))
        },
        {
            name: 'documentType' as const,
            type: 'select',
            label: 'Document Type',
            required: true,
            options: documentTypes.map(type => ({
                value: type.id.toString(),
                label: type.name
            }))
        },
        {
            name: 'branch' as const,
            type: 'select',
            label: 'Branch',
            required: true,
            options: branches.map(branch => ({
                value: branch.id.toString(),
                label: branch.branchName
            }))
        }
    ];

    return (
        <div>
            <FormComponent
                initialData={formData}
                onSubmit={handleSubmit}
                fields={fields}
                title="Add New Person"
                onView={onView}
                handleChange={handleChange}
            />
            {loading && <p>Loading...</p>}
            {errors.submit && <span className="error">{errors.submit}</span>}
        </div>
    );
};

export default PersonForm;
