import React, { useState } from 'react';
import FormComponent from '../GenericForm';
import { CompanyType } from '../../models/CompanyType';
import { CompanyTypeService } from '../../api/services/CompanyTypeService';

const CompanyTypeForm: React.FC<{ onView: () => void }> = ({ onView }) => {
    const initialData: CompanyType = {
        id: 0,
        description: ''
    };

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ submit?: string }>({});
    const [formData, setFormData] = useState<CompanyType>(initialData);

    const companyTypeService = new CompanyTypeService();

    const handleSubmit = async (data: CompanyType) => {
        setLoading(true);
        setErrors({});
        try {
            if (!data.description.trim()) {
                throw new Error('Description is required');
            }

            await companyTypeService.create(data);
            onView();
        } catch (error) {
            console.error('Error submitting form:', error);
            setErrors({ submit: 'Failed to save company type. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const fields = [
        {
            name: 'description' as const,
            type: 'text',
            label: 'Name Type',
            required: true
        }
    ];

    const handleChange = (name: keyof CompanyType, value: any) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div>
            <FormComponent
                initialData={formData}
                onSubmit={handleSubmit}
                fields={fields}
                title="Add New Company Type"
                onView={onView}
                handleChange={handleChange}
            />
            {loading && <p>Loading...</p>}
            {errors.submit && <span className="error">{errors.submit}</span>}
        </div>
    );
};

export default CompanyTypeForm;

