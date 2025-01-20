# PrestService

PrestService is a full-stack administrative web application designed to streamline the management of services, supplies, and user data. Built using modern web technologies like React, TypeScript, and Firebase, the project emphasizes modularity, scalability, and a seamless user experience.

---

## Features

### User-Focused Functionalities
- **Dynamic Forms and Lists**: Simplified management of entities like supplies, persons, and companies using reusable components.
- **Client-Side Routing**: Smooth navigation across pages such as Home, Admin Dashboard, and individual entity management.
- **Responsive Design**: Fully optimized for various devices using Tailwind CSS.

### Technical Highlights
- **Firebase Integration**: Backend services for authentication, data storage, and real-time updates.
- **TypeScript**: Enforced type safety and reduced runtime errors.
- **React Router**: Implemented dynamic routing for a seamless single-page application experience.
- **Reusable Components**: Components like `GenericForm` and `GenericList` designed for flexibility and scalability.
- **Confirmation Dialogs**: Improved user experience with modals for confirmation and interaction.

---

## Installation

### Prerequisites
- Node.js (v16 or later)
- npm or yarn

### Steps
1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```
2. Navigate to the project directory:
   ```bash
   cd PrestService
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and visit:
   ```
   http://localhost:5173
   ```

---

## Project Structure

```
PrestService/
├── src/
   ├── api/                  # API service logic
   ├── components/           # Reusable components (forms, lists, modals, etc.)
   ├── models/               # TypeScript interfaces and models
   ├── page/                # Page-level components (HomePage, AdminDashboard, etc.)
   ├── styles/              # Styling resources and Tailwind configuration
   ├── App.tsx             # Root component
   ├── main.tsx            # Entry point
├── public/               # Static assets
├── package.json          # Project metadata and dependencies
├── vite.config.ts        # Vite configuration
```

---

## Technologies Used

### Frontend
- **React**: Library for building user interfaces.
- **React Router**: For managing routes and navigation.
- **Tailwind CSS**: Utility-first CSS framework for styling.

### Backend and Services
- **Firebase**: Authentication and real-time database.
- **Axios**: For HTTP requests and API integration.

### Development Tools
- **TypeScript**: Type-safe JavaScript for enhanced reliability.
- **Vite**: Fast build tool and development server.
- **ESLint**: Enforced code quality and consistent style.

---

## Future Improvements
- **Role-Based Access Control**: Add user roles for enhanced security and feature restrictions.
- **Unit and Integration Testing**: Implement testing for key components and features.
- **Deployment**: Host the application on Firebase Hosting or similar platforms.

---

## Contribution
Contributions are welcome! Feel free to fork the repository, create a branch, and submit a pull request. For significant changes, please open an issue first to discuss the proposed changes.

---

## License
This project is licensed under the [MIT License](LICENSE).

---

## Contact
For questions or collaboration, please reach out to [Your Name] at [dg.alvarezr@gmail.com].