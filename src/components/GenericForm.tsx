import React, { useState } from 'react';
import styles from '../styles/GenericForm.module.css';

interface Field<T> {
    name: keyof T;
    type: string;
    label: string;
    manualId?: boolean;
    options?: { value: string; label: string }[];
    required?: boolean;
}

interface FormComponentProps<T> {
    initialData: T;
    onSubmit: (data: T) => Promise<void>;
    fields: Field<T>[];
    title: string;
    onView: () => void;
    handleChange: (name: keyof T, value: any) => void; // Añadido handleChange como prop
}

const FormComponent = <T extends { [key: string]: any }>({
    initialData,
    onSubmit,
    fields,
    title,
    onView,
    handleChange
}: FormComponentProps<T>) => {
    const [errors, setErrors] = useState<{ [key in keyof T]?: string }>({});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await onSubmit(initialData);
        } catch (error) {
            console.error('Error submitting form:', error);
            setErrors({ submit: 'Error submitting form' });
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <h2 className={styles.formTitle}>{title}</h2>

                    {fields.map((field) => (
                        <div className={styles.inputGroup} key={String(field.name)}>
                            <label htmlFor={field.name as string} className={styles.label}>
                                {field.label}:
                            </label>

                            {field.type === 'select' ? (
                                field.name === 'documentNumber' ? (
                                    <select
                                        id={field.name as string}
                                        className={styles.input}
                                        onChange={(e) => handleChange(field.name, e.target.value)} // Manejo de cambios para documentNumber
                                        required={field.required}
                                    >
                                        <option value="">Select {field.label}</option>
                                        {field.options?.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <select
                                        id={field.name as string}
                                        className={styles.input}
                                        onChange={(e) => handleChange(field.name, e.target.value)}
                                        required={field.required}
                                    >
                                        <option value="">Select {field.label}</option>
                                        {field.options?.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                )
                            ) : field.type === 'checkbox' ? (
                                <input
                                    type="checkbox"
                                    id={field.name as string}
                                    className={styles.input}
                                    onChange={(e) => handleChange(field.name, e.target.checked)} // Enviar el valor booleano
                                    required={field.required}
                                />
                            ) : (
                                <input
                                    type={field.type}
                                    id={field.name as string}
                                    className={styles.input}
                                    onChange={(e) => handleChange(field.name, e.target.value)}
                                    required={field.required}
                                />
                            )}
                            {errors[field.name] && <span className={styles.error}>{errors[field.name]}</span>}
                        </div>
                    ))}

                    <button type="submit" className={styles.submitButton}>Add</button>
                    <button type="button" className={styles.viewButton} onClick={onView}>
                        View {title}s
                    </button>
                </form>
            </div>
        </div>

    );
};

export default FormComponent;

