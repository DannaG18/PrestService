import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Form.module.css';

interface Field<T> {
    name: keyof T;
    type: string;
    label: string;
    manualId?: boolean;
    options?: string[];
    required?: boolean; // Added required property to Field
}

interface FormComponentProps<T> {
    initialData: T;
    onSubmit: (data: T) => Promise<void>;
    fields: Field<T>[];
    title: string;
    redirectPath: string;
}

const FormComponent = <T extends { [key: string]: any }>({
    initialData,
    onSubmit,
    fields,
    title,
    redirectPath
}: FormComponentProps<T>) => {
    const [formData, setFormData] = useState<T>(initialData);
    const [errors, setErrors] = useState<{ [key in keyof T]?: string }>({});
    const navigate = useNavigate();

    const handleChange = (name: keyof T, value: any) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await onSubmit(formData);
            setFormData(initialData);
        } catch (error) {
            console.error('Error submitting form:', error);
            setErrors({ submit: 'Error submitting form' });
        }
    };

    const handleViewClick = () => {
        navigate(redirectPath); // Redirect to the list component
    };

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <h2 className={styles.formTitle}>{title}</h2>

                    {/* Generate inputs based on the fields array */}
                    {fields.map((field) => (
                        <div className={styles.inputGroup} key={String(field.name)}> {/* Convert to string */}
                            <label htmlFor={field.name as string} className={styles.label}>{field.label}:</label>
                            <input
                                type={field.type}
                                id={field.name as string}
                                className={styles.input}
                                value={formData[field.name] || ''}  // Dynamically bind input value to state
                                onChange={(e) => handleChange(field.name, e.target.value)}
                                required={field.required}
                            />
                            {/* Display error message if exists */}
                            {errors[field.name] && <span className={styles.error}>{errors[field.name]}</span>}
                        </div>
                    ))}

                    {/* Submit and View buttons */}
                    <button type="submit" className={styles.submitButton}>Add</button>
                    <button type="button" className={styles.viewButton} onClick={handleViewClick}>
                        View {title}s
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FormComponent;