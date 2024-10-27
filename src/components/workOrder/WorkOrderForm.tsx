import React, { useState } from 'react';
import FormComponent from '../GenericForm';
import { WorkOrder } from '../../models/WorkOrder';
import { WorkOrderService } from '../../api/services/WorkOrderService';
import { PersonService } from '../../api/services/PersonService';
import { ServiceOrderService } from '../../api/services/ServiceOrderService';
import { Person } from '../../models/Person';
import { ServiceOrder } from '../../models/ServiceOrder';

const WorkOrderForm: React.FC<{ onView: () => void }> = ({ onView }) => {
    const initialData: WorkOrder = {
        id: 0,
        assignamentDate: '',
        assignamentHour: '',
        employeeId: {} as Person,
        serviceOrder: {} as ServiceOrder,
    };

    const [formData, setFormData] = useState<WorkOrder>(initialData);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ submit?: string }>({});
    const [employees, setEmployees] = useState<Person[]>([]);
    const [serviceOrders, setServiceOrders] = useState<ServiceOrder[]>([]);

    const workOrderService = new WorkOrderService();
    const personService = new PersonService();
    const serviceOrderService = new ServiceOrderService();

    const fetchEmployees = async () => {
        const fetchedEmployees = await personService.findAll(); 
        setEmployees(fetchedEmployees);
    };

    const fetchServiceOrders = async () => {
        const fetchedServiceOrders = await serviceOrderService.findAll(); 
        setServiceOrders(fetchedServiceOrders);
    };

    React.useEffect(() => {
        fetchEmployees();
        fetchServiceOrders();
    }, []);

    const handleChange = (name: keyof WorkOrder, value: any) => {
        if (name === 'employeeId') {
            const selectedEmployee = employees.find(emp => emp.documentNumber === value);
            if (selectedEmployee) {
                setFormData(prev => ({
                    ...prev,
                    employeeId: selectedEmployee
                }));
            }
        } else if (name === 'serviceOrder') {
            const selectedServiceOrder = serviceOrders.find(order => order.nroOrden === value);
            if (selectedServiceOrder) {
                setFormData(prev => ({
                    ...prev,
                    serviceOrder: selectedServiceOrder
                }));
            }
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (data: WorkOrder) => {
        setLoading(true);
        setErrors({});
        try {
            await workOrderService.create(data);
            onView();
        } catch (error) {
            setErrors({ submit: 'Failed to save work order. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const fields = [
        {
            name: 'assignamentDate' as const,
            type: 'date',
            label: 'Assignment Date',
            required: true
        },
        {
            name: 'assignamentHour' as const,
            type: 'time',
            label: 'Assignment Hour',
            required: true
        },
        {
            name: 'employeeId' as const,
            type: 'select',
            label: 'Employee',
            required: true,
            options: employees.map(emp => ({
                value: emp.documentNumber,
                label: `${emp.name} ${emp.lastName}`
            }))
        },
        {
            name: 'serviceOrder' as const,
            type: 'select',
            label: 'Service Order',
            required: true,
            options: serviceOrders.map(order => ({
                value: order.nroOrden.toString(),
                label: `Order #${order.nroOrden}`
            }))
        }
    ];

    return (
        <div>
            <FormComponent
                initialData={formData}
                onSubmit={handleSubmit}
                fields={fields}
                title="Add New Work Order"
                onView={onView}
                handleChange={handleChange}
            />
            {loading && <p>Loading...</p>}
            {errors.submit && <span className="error">{errors.submit}</span>}
        </div>
    );
};

export default WorkOrderForm;