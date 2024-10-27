import React, { useState } from 'react';
import styles from '../styles/AdminDashboard.module.css';

import Navbar from '../components/home/Navbar';
import Footer from '../components/home/Footer';
import LiveChat from '../components/home/LiveChat';

import SupplyForm from '../components/supply/SupplyForm';
import SupplyList from '../components/supply/SupplyList';
import BranchForm from '../components/branch/BranchForm';
import BranchList from '../components/branch/BranchList';
import CountryForm from '../components/country/CountryForm';
import CountryList from '../components/country/CountryList';
import RegionForm from '../components/region/RegionForm';
import RegionList from '../components/region/RegionList';
import CityForm from '../components/city/CItyForm';
import CityList from '../components/city/CityList';
import CompanyTypeForm from '../components/companyType/CompanyTypeForm';
import CompanyTypeList from '../components/companyType/CompanyTypeList';
import CompanyForm from '../components/company/CompanyForm';
import CompanyList from '../components/company/CompanyList';
import ApprovalStatusForm from '../components/approvalStatus/ApprovalStatusForm';
import ApprovalStatusList from '../components/approvalStatus/ApprovalStatusList';
import DocumentTypeForm from '../components/documentType/DocumentTypeForm';
import DocumentTypeList from '../components/documentType/DocumentTypeList';
import EmailPersonForm from '../components/emailPerson/EmailPersonForm';
import EmailPersonList from '../components/emailPerson/EmailPersonList';
import EmailTypeForm from '../components/emailType/EmailTypeForm';
import EmailTypeList from '../components/emailType/EmailTypeList';
import OrderDetailForm from '../components/orderDetail/OrderDetailForm';
import OrderDetailList from '../components/orderDetail/OrderDetailList';
import PersonForm from '../components/person/PersonForm';
import PersonList from '../components/person/PersonList';
import PersonTypeForm from '../components/personType/PersonTypeForm';
import PersonTypeList from '../components/personType/PersonTypeList';
import PhonePersonForm from '../components/phonePerson/PhonePersonForm';
import PhonePersonList from '../components/phonePerson/PhonePersonList';
import PhoneTypeForm from '../components/phoneType/PhoneTypeForm';
import PhoneTypeList from '../components/phoneType/PhoneTypeList';
import ServiceForm from '../components/service/ServiceForm';
import ServiceList from '../components/service/ServiceList';
import ServiceApprovalForm from '../components/serviceApproval/ServiceApprovalForm';
import ServiceApprovalList from '../components/serviceApproval/ServiceApprovalList';
import ServiceOrderForm from '../components/serviceOrder/ServiceOrderForm';
import ServiceOrderList from '../components/serviceOrder/ServiceOrderList';
import StatusOrderForm from '../components/statusOrder/StatusOrderForm';
import StatusOrderList from '../components/statusOrder/StatusOrderList';
import StatusServiceOrderForm from '../components/statusServiceOrder/StatusServiceOrderForm';
import StatusServiceOrderList from '../components/statusServiceOrder/StatusServiceOrderList';
import WorkOrderForm from '../components/workOrder/WorkOrderForm';
import WorkOrderList from '../components/workOrder/WorkOrderList';
import WorkOrderDetailsForm from '../components/workOrderDetails/WorkOrderDetailsForm';
import WorkOrderDetailsList from '../components/workOrderDetails/WorkOrderDetailsList';


interface Entity {
    name: string;
    form: React.ComponentType<{ onNotify: (message: string) => void; onView: () => void }>; 
    list: React.ComponentType<{ onNotify: (message: string) => void }>;
}

const entities: Entity[] = [
    { name: 'Country', form: CountryForm, list: CountryList },
    { name: 'Branch', form: BranchForm, list: BranchList },
    { name: 'Supply', form: SupplyForm, list: SupplyList },
    { name: 'Region', form: RegionForm, list: RegionList },
    { name: 'City', form: CityForm, list: CityList },
    { name: 'CompanyType', form: CompanyTypeForm, list: CompanyTypeList },
    { name: 'Company', form: CompanyForm, list: CompanyList },
    { name: 'DocumentType', form: DocumentTypeForm, list: DocumentTypeList },
    { name: 'EmailPerson', form: EmailPersonForm, list: EmailPersonList },
    { name: 'ApprovalStatus', form: ApprovalStatusForm, list: ApprovalStatusList },
    { name: 'EmailType', form: EmailTypeForm, list: EmailTypeList },
    { name: 'OrderDetail', form: OrderDetailForm, list: OrderDetailList },
    { name: 'Person', form: PersonForm, list: PersonList },
    { name: 'PersonType', form: PersonTypeForm, list: PersonTypeList },
    { name: 'PhonePerson', form: PhonePersonForm, list: PhonePersonList },
    { name: 'PhoneType', form: PhoneTypeForm, list: PhoneTypeList },
    { name: 'Service', form: ServiceForm, list: ServiceList },
    { name: 'ServiceApproval', form: ServiceApprovalForm, list: ServiceApprovalList },
    { name: 'ServiceOrder', form: ServiceOrderForm, list: ServiceOrderList },
    { name: 'StatusServiceOrder', form: StatusServiceOrderForm, list: StatusServiceOrderList },
    { name: 'StatusOrder', form: StatusOrderForm, list: StatusOrderList },
    { name: 'WorkOrder', form: WorkOrderForm, list: WorkOrderList },
    { name: 'WorkOrderDetails', form: WorkOrderDetailsForm, list: WorkOrderDetailsList },
];

const AdminDashboard: React.FC = () => {
    const [selectedEntity, setSelectedEntity] = useState<Entity>(entities[0]);
    const [showForm, setShowForm] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

    const filteredEntities = entities.filter(entity =>
        entity.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEntityChange = (entity: Entity) => {
        setSelectedEntity(entity);
        setShowForm(true);
        setSidebarOpen(false);
    };

    const handleNotification = (message: string) => {
        alert(message); 
    };

    const handleViewChange = () => {
        setShowForm(false); 
    };

    return (
        <div className={styles.app}>
            <Navbar />
            <div className={styles.dashboard}>
                <button className={styles.menuButton} onClick={() => setSidebarOpen(!sidebarOpen)}>
                    {sidebarOpen ? 'Close' : 'Menu'}
                </button>
                <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`}>
                    <input
                        type="search"
                        placeholder="Search entity..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                    />
                    <nav className={styles.entityNav}>
                        {filteredEntities.map((entity) => (
                            <button
                                key={entity.name}
                                className={`${styles.entityButton} ${selectedEntity.name === entity.name ? styles.active : ''}`}
                                onClick={() => handleEntityChange(entity)}
                            >
                                {entity.name}
                            </button>
                        ))}
                    </nav>
                </aside>
                <main className={styles.mainContent}>
                    <div className={styles.entityHeader}>
                        <h1>{selectedEntity.name}</h1>
                        <div className={styles.viewToggle}>
                            <button
                                className={`${styles.toggleButton} ${showForm ? styles.active : ''}`}
                                onClick={() => setShowForm(true)}
                            >
                                Form
                            </button>
                            <button
                                className={`${styles.toggleButton} ${!showForm ? styles.active : ''}`}
                                onClick={() => setShowForm(false)}
                            >
                                List
                            </button>
                        </div>
                    </div>
                    <div className={styles.entityContent}>
                        {showForm ? (
                            <selectedEntity.form 
                                onNotify={handleNotification} 
                                onView={handleViewChange} 
                            />
                        ) : (
                            <selectedEntity.list onNotify={handleNotification} />
                        )}
                    </div>
                </main>
            </div>
            <Footer />
            <LiveChat />
        </div>
    );
};

export default AdminDashboard;

