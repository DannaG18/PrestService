import React, { useState } from 'react';
import FormComponent from '../GenericForm'; 
import { Service } from '../../models/Service';
import { ServiceService } from '../../api/services/ServiceService';

const ServiceForm: React.FC<{ onView: () => void }> = ({ onView }) => {
    const initialData: Service = {
        id: 0,
        name: '',
        requireSupply: false,
        executionTime: '',
    };

    const [formData, setFormData] = useState<Service>(initialData);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ submit?: string }>({});

    const serviceService = new ServiceService();

    const handleSubmit = async (data: Service) => {
        setLoading(true);
        setErrors({});
        try {
            await serviceService.create(data);
            onView();
        } catch (error) {
            console.error('Error submitting form:', error);
            setErrors({ submit: 'Failed to save service. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (name: keyof Service, value: any) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const fields = [
        {
            name: 'name' as const,
            type: 'text',
            label: 'Service Name',
            required: true
        },
        {
            name: 'requireSupply' as const,
            type: 'checkbox',
            label: 'Requires Supply',
            required: false
        },
        {
            name: 'executionTime' as const,
            type: 'text',
            label: 'Execution Time',
            required: true
        }
    ];

    return (
        <div>
            <FormComponent
                initialData={formData}
                onSubmit={handleSubmit}
                fields={fields}
                title="Add New Service"
                onView={onView}
                handleChange={handleChange}
            />
            {loading && <p>Loading...</p>}
            {errors.submit && <span className="error">{errors.submit}</span>}
        </div>
    );
};

export default ServiceForm;

