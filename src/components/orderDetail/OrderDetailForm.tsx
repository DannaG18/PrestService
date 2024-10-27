import React, { useState, useEffect } from 'react';
import FormComponent from '../GenericForm';
import { OrderDetail } from '../../models/OrderDetail';
import { Service } from '../../models/Service';
import { ServiceOrder } from '../../models/ServiceOrder';
import { OrderDetailService } from '../../api/services/OrderDetailService';
import { ServiceService } from '../../api/services/ServiceService';
import { ServiceOrderService } from '../../api/services/ServiceOrderService';

const OrderDetailForm: React.FC<{ onView: () => void }> = ({ onView }) => {
    const initialData: OrderDetail = {
        id: 0,
        serviceValue: 0,
        service: {} as Service,
        serviceOrder: {} as ServiceOrder
    };

    const [formData, setFormData] = useState<OrderDetail>(initialData);
    const [services, setServices] = useState<Service[]>([]);
    const [serviceOrders, setServiceOrders] = useState<ServiceOrder[]>([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ submit?: string }>({});
    const orderDetailService = new OrderDetailService();
    const serviceService = new ServiceService();
    const serviceOrderService = new ServiceOrderService();

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const fetchedServices = await serviceService.findAll();
                setServices(fetchedServices);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        const fetchServiceOrders = async () => {
            try {
                const fetchedServiceOrders = await serviceOrderService.findAll();
                setServiceOrders(fetchedServiceOrders);
            } catch (error) {
                console.error('Error fetching service orders:', error);
            }
        };

        fetchServices();
        fetchServiceOrders();
    }, []);

    const handleChange = (name: keyof OrderDetail, value: any) => {
        if (name === 'service') {
            const selectedService = services.find(service => service.id.toString() === value);
            if (selectedService) {
                setFormData(prev => ({
                    ...prev,
                    service: selectedService
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

    const handleSubmit = async (data: OrderDetail) => {
        setLoading(true);
        setErrors({});
        try {
            await orderDetailService.create(data);
            onView();
        } catch (error) {
            console.error('Error submitting form:', error);
            setErrors({ submit: 'Failed to save order detail. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const fields = [
        {
            name: 'service' as const,
            type: 'select',
            label: 'Service',
            required: true,
            options: services.map(service => ({
                value: service.id.toString(),
                label: service.name
            }))
        },
        {
            name: 'serviceOrder' as const,
            type: 'select',
            label: 'Service Order',
            required: true,
            options: serviceOrders.map(order => ({
                value: order.nroOrden.toString(),
                label: order.nroOrden.toString() 
            }))
        },
        {
            name: 'serviceValue' as const,
            type: 'number',
            label: 'Service Value',
            required: true
        }
    ];

    return (
        <div>
            <FormComponent
                initialData={formData}
                onSubmit={handleSubmit}
                fields={fields}
                title="Add New Order Detail"
                onView={onView}
                handleChange={handleChange}
            />
            {loading && <p>Loading...</p>}
            {errors.submit && <span className="error">{errors.submit}</span>}
        </div>
    );
};

export default OrderDetailForm;

