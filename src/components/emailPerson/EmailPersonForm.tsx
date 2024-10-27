import React, { useState, useEffect } from 'react';
import FormComponent from '../GenericForm';
import { EmailPerson } from '../../models/EmailPerson';
import { EmailType } from '../../models/EmailType';
import { Person } from '../../models/Person';
import { EmailPersonService } from '../../api/services/EmailPersonService';
import { EmailTypeService } from '../../api/services/EmailTypeService';
import { PersonService } from '../../api/services/PersonService';

const EmailPersonForm: React.FC<{ onView: () => void }> = ({ onView }) => {
    const initialData: EmailPerson = {
        id: 0,
        email: '',
        documentNumber: {} as Person,
        emailType: {} as EmailType
    };
    

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ submit?: string }>({});
    const [emailTypes, setEmailTypes] = useState<EmailType[]>([]);
    const [persons, setPersons] = useState<Person[]>([]);
    const [formData, setFormData] = useState<EmailPerson>(initialData);

    const emailPersonService = new EmailPersonService();
    const emailTypeService = new EmailTypeService();
    const personService = new PersonService();

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const fetchedEmailTypes = await emailTypeService.findAll();
                const fetchedPersons = await personService.findAll();
                setEmailTypes(fetchedEmailTypes);
                setPersons(fetchedPersons);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchOptions();
    }, []);

    const handleChange = (name: keyof EmailPerson, value: any) => {
        if (name === 'documentNumber') {
            const selectedPerson = persons.find(person => person.documentNumber === value);
            if (selectedPerson) {
                setFormData(prev => ({
                    ...prev,
                    documentNumber: selectedPerson
                }));
            }
        } else if (name === 'emailType') {
            const selectedEmailType = emailTypes.find(type => type.id.toString() === value);
            if (selectedEmailType) {
                setFormData(prev => ({
                    ...prev,
                    emailType: selectedEmailType
                }));
            }
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (data: EmailPerson) => {
        setLoading(true);
        setErrors({});

        try {
            await emailPersonService.create(data);
            onView();
        } catch (error) {
            console.error('Error submitting form:', error);
            setErrors({ submit: 'Failed to save email person. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const fields = [
        {
            name: 'documentNumber' as const,
            type: 'select',
            label: 'Person',
            required: true,
            options: persons.map(person => ({
                value: person.documentNumber,
                label: `${person.name} ${person.lastName}`
            }))
        },
        {
            name: 'emailType' as const,
            type: 'select',
            label: 'Email Type',
            required: true,
            options: emailTypes.map(type => ({
                value: type.id.toString(),
                label: type.name
            }))
        },
        {
            name: 'email' as const,
            type: 'text',
            label: 'Email Address',
            required: true
        }
    ];

    return (
        <div>
            <FormComponent
                initialData={formData}
                onSubmit={handleSubmit}
                fields={fields}
                title="Add New Email Person"
                onView={onView}
                handleChange={handleChange}
            />
            {loading && <p>Loading...</p>}
            {errors.submit && <span className="error">{errors.submit}</span>}
        </div>
    );
};

export default EmailPersonForm;