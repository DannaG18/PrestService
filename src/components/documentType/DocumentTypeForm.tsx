import React, { useState } from 'react';
import FormComponent from '../GenericForm';
import { DocumentType } from '../../models/DocumentType';
import { DocumentTypeService } from '../../api/services/DocumentTypeService';

const DocumentTypeForm: React.FC<{ onView: () => void }> = ({ onView }) => {
    const initialData: DocumentType = {
        id: 0,
        name: '',
    };

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ submit?: string }>({});
    const [formData, setFormData] = useState<DocumentType>(initialData);
    const documentTypeService = new DocumentTypeService();

    const handleChange = (name: keyof DocumentType, value: any) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (data: DocumentType) => {
        setLoading(true);
        setErrors({});

        try {
            await documentTypeService.create(data);
            onView();
        } catch (error) {
            console.error('Error submitting form:', error);
            setErrors({ submit: 'Failed to save document type. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const fields = [
        {
            name: 'name' as const,
            type: 'text',
            label: 'Document Type Name',
            required: true
        }
    ];

    return (
        <div>
            <FormComponent
                initialData={formData}
                onSubmit={handleSubmit}
                fields={fields}
                title="Add New Document Type"
                onView={onView}
                handleChange={handleChange}
            />
            {loading && <p>Loading...</p>}
            {errors.submit && <span className="error">{errors.submit}</span>}
        </div>
    );
};

export default DocumentTypeForm;
