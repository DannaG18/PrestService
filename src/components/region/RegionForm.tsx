import React, { useState, useEffect } from 'react';
import FormComponent from '../GenericForm';
import { Region } from '../../models/Region';
import { RegionService } from '../../api/services/RegionService';
import { CountryService } from '../../api/services/CountryService';
import { Country } from '../../models/Country';

const RegionForm: React.FC<{ onView: () => void }> = ({ onView }) => {
    const initialData: Region = {
        id: 0,
        country: {} as Country,
        nameRegion: ''
    };

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ submit?: string }>({});
    const [countries, setCountries] = useState<Country[]>([]);
    const [formData, setFormData] = useState<Region>(initialData);
    const regionService = new RegionService();
    const countryService = new CountryService();

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const fetchedCountries = await countryService.findAll();
                setCountries(fetchedCountries);
                if (fetchedCountries.length > 0) {
                    setFormData(prev => ({
                        ...prev,
                        country: fetchedCountries[0] // Preseleccionar el primer país
                    }));
                }
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };
        fetchCountries();
    }, []);

    const handleChange = (name: keyof Region, value: any) => {
        if (name === 'country') {
            const selectedCountry = countries.find(country => country.id.toString() === value);
            if (selectedCountry) {
                setFormData(prev => ({
                    ...prev,
                    country: {
                        id: selectedCountry.id,
                        nameCountry: selectedCountry.nameCountry
                    }
                }));
            }
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
        console.log('FormData:', { ...formData, [name]: value }); // Verifica el estado actual
    };

    const handleSubmit = async (data: Region) => {
        setLoading(true);
        setErrors({});
        console.log('Submitting Data:', data); // Verifica los datos enviados

        try {
            if (!data.country || data.country.id === 0) {
                throw new Error('Country is required');
            }
            await regionService.create(data);
            onView(); 
        } catch (error) {
            console.error('Error submitting form:', error);
            setErrors({ submit: 'Failed to save region. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const fields = [
        {
            name: 'country' as const,
            type: 'select',
            label: 'Country',
            required: false,
            options: countries.map(country => ({
                value: country.id.toString(),
                label: country.nameCountry
            }))
        },
        {
            name: 'nameRegion' as const,
            type: 'text',
            label: 'Region Name',
            required: true
        }
    ];

    return (
        <div>
            <FormComponent
                initialData={formData}
                onSubmit={handleSubmit}
                fields={fields}
                title="Add New Region"
                onView={onView}
                handleChange={handleChange}
            />
            {loading && <p>Loading...</p>}
            {errors.submit && <span className="error">{errors.submit}</span>}
        </div>
    );
};

export default RegionForm;

