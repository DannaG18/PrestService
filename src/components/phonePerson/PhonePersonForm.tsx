import React, { useState, useEffect } from 'react';
import FormComponent from '../GenericForm';
import { PhonePerson } from '../../models/PhonePerson';
import { PhonePersonService } from '../../api/services/PhonePersonService';
import { PersonService } from '../../api/services/PersonService'; 
import { PhoneTypeService } from '../../api/services/PhoneTypeService'; 
import { Person } from '../../models/Person';
import { PhoneType } from '../../models/PhoneType';

const PhonePersonForm: React.FC<{ onView: () => void }> = ({ onView }) => {
    const initialData: PhonePerson = {
        id: 0,
        documentNumber: {} as Person,
        phoneTypeId: {} as PhoneType,
        phone: '',
    };

    const [formData, setFormData] = useState<PhonePerson>(initialData);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ submit?: string }>({});
    const [persons, setPersons] = useState<Person[]>([]);
    const [phoneTypes, setPhoneTypes] = useState<PhoneType[]>([]);

    const phonePersonService = new PhonePersonService();
    const personService = new PersonService();
    const phoneTypeService = new PhoneTypeService();

    useEffect(() => {
        const fetchPersons = async () => {
            try {
                const fetchedPersons = await personService.findAll();
                setPersons(fetchedPersons);
                if (fetchedPersons.length > 0) {
                    setFormData(prev => ({
                        ...prev
                    }));
                }
            } catch (error) {
                console.error('Error fetching persons:', error);
            }
        };

        const fetchPhoneTypes = async () => {
            try {
                const fetchedPhoneTypes = await phoneTypeService.findAll();
                setPhoneTypes(fetchedPhoneTypes);
                if (fetchedPhoneTypes.length > 0) {
                    setFormData(prev => ({
                        ...prev
                    }));
                }
            } catch (error) {
                console.error('Error fetching phone types:', error);
            }
        };

        fetchPersons();
        fetchPhoneTypes();
    }, []);

    const handleChange = (name: keyof PhonePerson, value: any) => {
        if (name === 'documentNumber') {
            const selectedPerson = persons.find(person => person.documentNumber === value);
            if (selectedPerson) {
                setFormData(prev => ({
                    ...prev,
                    documentNumber: selectedPerson // Set the full person object
                }));
            }
        } else if (name === 'phoneTypeId') {
            const selectedPhoneType = phoneTypes.find(type => type.id.toString() === value);
            if (selectedPhoneType) {
                setFormData(prev => ({
                    ...prev,
                    phoneTypeId: selectedPhoneType // Set the full phone type object
                }));
            }
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (data: PhonePerson) => {
        setLoading(true);
        setErrors({});
        try {
            await phonePersonService.create(data);
            onView();
        } catch (error) {
            console.error('Error submitting form:', error);
            setErrors({ submit: 'Failed to save phone person. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const fields = [
        {
            name: 'documentNumber' as const,
            type: 'select',
            label: 'Select Document Number',
            required: true,
            options: persons.map(person => ({
                value: person.documentNumber,
                label: `${person.name} ${person.lastName}`
            }))
        },
        {
            name: 'phoneTypeId' as const,
            type: 'select',
            label: 'Phone Type',
            required: true,
            options: phoneTypes.map(type => ({
                value: type.id.toString(),
                label: type.description
            }))
        },
        {
            name: 'phone' as const,
            type: 'text',
            label: 'Phone Number',
            required: true
        }
    ];

    return (
        <div>
            <FormComponent
                initialData={formData}
                onSubmit={handleSubmit}
                fields={fields}
                title="Add New Phone Person"
                onView={onView}
                handleChange={handleChange}
            />
            {loading && <p>Loading...</p>}
            {errors.submit && <span className="error">{errors.submit}</span>}
        </div>
    );
};

export default PhonePersonForm;

