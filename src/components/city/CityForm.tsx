import React, { useState, useEffect } from 'react';
import FormComponent from '../GenericForm';
import { City } from '../../models/City';
import { RegionService } from '../../api/services/RegionService';
import { CityService } from '../../api/services/CityService';
import { Region } from '../../models/Region';

const CityForm: React.FC<{ onView: () => void }> = ({ onView }) => {
    const initialData: City = {
        id: 0,
        region: {} as Region,
        nameCity: ''
    };

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ submit?: string }>({});
    const [regions, setRegions] = useState<Region[]>([]);
    const [formData, setFormData] = useState<City>(initialData);

    const cityService = new CityService();
    const regionService = new RegionService();

    useEffect(() => {
        const fetchRegions = async () => {
            try {
                const fetchedRegions = await regionService.findAll();
                setRegions(fetchedRegions);
                if (fetchedRegions.length > 0) {
                    setFormData(prev => ({
                        ...prev
                    }));
                }
            } catch (error) {
                console.error('Error fetching regions:', error);
            }
        };
        fetchRegions();
    }, []);

    const handleChange = (name: keyof City, value: any) => {
        if (name === 'region') {
            const selectedRegion = regions.find(region => region.id.toString() === value);
            if (selectedRegion) {
                setFormData(prev => ({
                    ...prev,
                    region: { // Cambia a 'region'
                        id: selectedRegion.id,
                        nameRegion: selectedRegion.nameRegion,
                        country: selectedRegion.country // Incluye correctamente el country
                    }
                }));
            }
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
        console.log('FormData:', { ...formData, [name]: value });
    };

    const handleSubmit = async (data: City) => {
        setLoading(true);
        setErrors({});
        console.log('Submitting Data:', data);
        try {
            if (!data.region || data.region.id === 0) {
                throw new Error('Region is required');
            }

            await cityService.create(data);
            onView();
        } catch (error) {
            console.error('Error submitting form:', error);
            setErrors({ submit: 'Failed to save city. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const fields = [
        {
            name: 'region' as const,
            type: 'select',
            label: 'Region',
            required: true,
            options: regions.map(region => ({
                value: region.id.toString(),
                label: region.nameRegion 
            }))
        },
        {
            name: 'nameCity' as const,
            type: 'text',
            label: 'City Name',
            required: true
        }
    ];

    return (
        <div>
            <FormComponent
                initialData={formData}
                onSubmit={handleSubmit}
                fields={fields}
                title="Add New City"
                onView={onView}
                handleChange={handleChange}
            />
            {loading && <p>Loading...</p>}
            {errors.submit && <span className="error">{errors.submit}</span>}
        </div>
    );
};

export default CityForm;


