import React, { useState, useEffect } from 'react';
import FormComponent from '../GenericForm';
import { Branch } from '../../models/Branch';
import { BranchService } from '../../api/services/BranchService';
import { CompanyService } from '../../api/services/CompanyService';
import { CityService } from '../../api/services/CityService';
import { Company } from '../../models/Company';
import { City } from '../../models/City';

const BranchForm: React.FC<{ onView: () => void }> = ({ onView }) => {
    const initialData: Branch = {
        id: 0,
        nit: '',
        company: {} as Company,
        city: {} as City,
        branchName: '',
        creationDate: ''
    };

    const [formData, setFormData] = useState<Branch>(initialData);
    const [companies, setCompanies] = useState<Company[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ submit?: string }>({});
    const branchService = new BranchService();
    const companyService = new CompanyService();
    const cityService = new CityService();

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const fetchedCompanies = await companyService.findAll();
                setCompanies(fetchedCompanies);
            } catch (error) {
                console.error('Error fetching companies:', error);
            }
        };

        const fetchCities = async () => {
            try {
                const fetchedCities = await cityService.findAll();
                setCities(fetchedCities);
            } catch (error) {
                console.error('Error fetching cities:', error);
            }
        };

        fetchCompanies();
        fetchCities();
    }, []);

    const handleChange = (name: keyof Branch, value: any) => {
        if (name === 'company') {
            const selectedCompany = companies.find(company => company.id.toString() === value);
            if (selectedCompany) {
                setFormData(prev => ({
                    ...prev,
                    company: selectedCompany
                }));
            }
        } else if (name === 'city') {
            const selectedCity = cities.find(city => city.id.toString() === value);
            if (selectedCity) {
                setFormData(prev => ({
                    ...prev,
                    city: selectedCity
                }));
            }
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (data: Branch) => {
        setLoading(true);
        setErrors({});
        try {
            await branchService.create(data);
            onView();
        } catch (error) {
            console.error('Error submitting form:', error);
            setErrors({ submit: 'Failed to save branch. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const fields = [
        {
            name: 'nit' as const,
            type: 'text',
            label: 'NIT',
            required: true
        },
        {
            name: 'branchName' as const,
            type: 'text',
            label: 'Branch Name',
            required: true
        },
        {
            name: 'creationDate' as const,
            type: 'date',
            label: 'Creation Date',
            required: true
        },
        {
            name: 'company' as const,
            type: 'select',
            label: 'Company',
            required: true,
            options: companies.map(company => ({
                value: company.id.toString(),
                label: company.name
            }))
        },
        {
            name: 'city' as const,
            type: 'select',
            label: 'City',
            required: true,
            options: cities.map(city => ({
                value: city.id.toString(),
                label: city.cityName
            }))
        }
    ];

    return (
        <div>
            <FormComponent
                initialData={formData}
                onSubmit={handleSubmit}
                fields={fields}
                title="Add New Branch"
                onView={onView}
                handleChange={handleChange}
            />
            {loading && <p>Loading...</p>}
            {errors.submit && <span className="error">{errors.submit}</span>}
        </div>
    );
};

export default BranchForm;


