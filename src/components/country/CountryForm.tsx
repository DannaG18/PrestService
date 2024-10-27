import React, { useState } from 'react';
import FormComponent from '../GenericForm';
import { Country } from '../../models/Country'; 
import { CountryService } from '../../api/services/CountryService'; 

const CountryForm: React.FC<{ onView: () => void }> = ({ onView }) => {
    const initialData: Country = {
        id: 0,
        nameCountry: ''
    };

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ submit?: string }>({});
    const [formData, setFormData] = useState<Country>(initialData); 
    const countryService = new CountryService();

    const handleSubmit = async (data: Country) => {
        setLoading(true);
        setErrors({});
        try {
            await countryService.create(data); 
            onView(); 
        } catch (error) {
            console.error('Error saving country:', error);
            setErrors({ submit: 'Failed to save country. Please try again.' });
        } finally {
            setLoading(false); 
        }
    };

    const fields = [
        {
            name: 'nameCountry' as const,
            type: 'text',
            label: 'Country Name',
            required: true
        }
    ];

    const handleChange = (name: keyof Country, value: any) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div>
            <FormComponent
                initialData={formData} 
                onSubmit={handleSubmit}
                fields={fields}
                title="Add New Country"
                onView={onView} 
                handleChange={handleChange} 
            />
            {loading && <p>Loading...</p>}
            {errors.submit && <span className="error">{errors.submit}</span>}
        </div>
    );
};

export default CountryForm;

