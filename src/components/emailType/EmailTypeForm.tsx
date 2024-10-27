import React, { useState } from 'react';
import FormComponent from '../GenericForm';
import { EmailType } from '../../models/EmailType';
import { EmailTypeService } from '../../api/services/EmailTypeService';

const EmailTypeForm: React.FC<{ onView: () => void }> = ({ onView }) => {
    const initialData: EmailType = {
        id: 0,
        name: '',
    };

    const [formData, setFormData] = useState<EmailType>(initialData);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ submit?: string }>({});

    const emailTypeService = new EmailTypeService();

    const handleChange = (name: keyof EmailType, value: any) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (data: EmailType) => {
        setLoading(true);
        setErrors({});
        try {
            await emailTypeService.create(data);
            onView();
        } catch (error) {
            setErrors({ submit: 'Failed to save email type. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const fields = [
        {
            name: 'name' as const,
            type: 'text',
            label: 'Name',
            required: true
        }
    ];

    return (
        <div>
            <FormComponent
                initialData={formData}
                onSubmit={handleSubmit}
                fields={fields}
                title="Add New Email Type"
                onView={onView}
                handleChange={handleChange}
            />
            {loading && <p>Loading...</p>}
            {errors.submit && <span className="error">{errors.submit}</span>}
        </div>
    );
};

export default EmailTypeForm;
