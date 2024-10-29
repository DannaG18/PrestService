import React, { useState } from 'react';
import FormComponent from '../GenericForm'; 
import { PersonType } from '../../models/PersonType';
import { PersonTypeService } from '../../api/services/PersonTypeService';

const PersonTypeForm: React.FC<{ onView: () => void }> = ({ onView }) => {
    const initialData: PersonType = {
        id: 0, 
        namePersonType: '',
    };

    const [formData, setFormData] = useState<PersonType>(initialData);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ submit?: string }>({});
    const personTypeService = new PersonTypeService();

    const handleChange = (name: keyof PersonType, value: any) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (data: PersonType) => {
        setLoading(true);
        setErrors({});
        try {
            await personTypeService.create(data);
            onView();
        } catch (error) {
            console.error('Error submitting form:', error);
            setErrors({ submit: 'Failed to save person type. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const fields = [
        {
            name: 'namePersonType' as const,
            type: 'text',
            label: 'Person Type Name',
            required: true
        },
    ];

    return (
        <div>
            <FormComponent
                initialData={formData}
                onSubmit={handleSubmit}
                fields={fields}
                title="Add New Person Type"
                onView={onView}
                handleChange={handleChange}
            />
            {loading && <p>Loading...</p>}
            {errors.submit && <span className="error">{errors.submit}</span>}
        </div>
    );
};

export default PersonTypeForm;
