import React, { useState, useEffect } from 'react';
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
    handleChange // Recibimos handleChange como prop
}: FormComponentProps<T>) => {
    const [formData, setFormData] = useState<T>(initialData);
    const [errors, setErrors] = useState<{ [key in keyof T]?: string }>({});

    // Actualizar el formData cuando initialData cambia
    useEffect(() => {
        setFormData(initialData);
    }, [initialData]);

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

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <h2 className={styles.formTitle}>{title}</h2>

                    {/* Generar inputs dinámicamente basado en el tipo de campo */}
                    {fields.map((field) => (
                        <div className={styles.inputGroup} key={String(field.name)}>
                            <label htmlFor={field.name as string} className={styles.label}>
                                {field.label}:
                            </label>

                            {field.type === 'select' ? (
                                // Campo tipo select
                                <select
                                    id={field.name as string}
                                    className={styles.input}
                                    value={formData[field.name] || ''} 
                                    onChange={(e) => handleChange(field.name, e.target.value)} // Usamos handleChange pasado desde el padre
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
                                // Campo tipo input
                                <input
                                    type={field.type}
                                    id={field.name as string}
                                    className={styles.input}
                                    value={formData[field.name] || ''}
                                    onChange={(e) => handleChange(field.name, e.target.value)} // Usamos handleChange pasado desde el padre
                                    required={field.required}
                                />
                            )}

                            {/* Mostrar mensaje de error si existe */}
                            {errors[field.name] && <span className={styles.error}>{errors[field.name]}</span>}
                        </div>
                    ))}

                    {/* Botones de Submit y View */}
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
