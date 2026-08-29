# 🏥 PharmaSee

**Bridging the gap between patients and pharmacies with intelligent medicine discovery**

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-ISC-green.svg)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-brightgreen)
![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

## 🎯 Overview

**PharmaSee** is a comprehensive full-stack application designed to revolutionize how patients discover medicines and connect with nearby pharmacies. In today's busy world, finding the right medicine at the right place shouldn't be complicated. PharmaSee brings everything to users instantly with intelligent search, prescription uploads, and geolocation-based pharmacy discovery.

The platform serves two primary user types:
- **Customers/Patients**: Search for medicines, upload prescriptions, find nearby pharmacies
- **Store Owners/Pharmacists**: Manage their inventory, handle test bookings, and interact with customers

## ✨ Features

### 🔐 Authentication & User Management
- **Dual Registration System**: Separate registration flows for customers and pharmacy stores
- **Secure Authentication**: JWT-based authentication with refresh token mechanism
- **Password Management**: Secure password hashing with bcrypt, password change functionality
- **User Profiles**: Complete profile management with avatar uploads
- **Account Settings**: Update personal details, contact information, and preferences

### 👥 Customer Features
- **Medicine Search**: Search for specific medicines by name
- **Prescription Management**: Upload and post prescription images for pharmacy verification
- **Profile Management**: Update account details and avatar
- **Pharmacy Discovery**: Find nearby pharmacies with geolocation support
- **Text Requests**: Send direct text requests to pharmacies
- **Doctor Consultation**: Access to available doctors at pharmacies

### 🏪 Pharmacy Store Features
- **Store Registration**: Complete pharmacy onboarding with location coordinates
- **Doctor Management**: Add, update, and manage doctors within the pharmacy
  - Create new doctor profiles
  - Update doctor details and contact information
  - Manage doctor avatars
  - Remove doctors from the system
- **Lab Test Management**: Manage available lab tests
  - Create and update test information
  - Track test inventory
  - Delete outdated tests
- **Store Details**: Update operating hours, location, contact information, and branding
- **Inventory Management**: Display and manage available medicines and services
- **Customer Interaction**: Handle customer inquiries and prescription requests

### 📱 Business Features
- **Post Management**: Create and manage posts for promotions and updates
- **Request Handling**: Manage customer text requests and inquiries
- **Geolocation Support**: Store location using geographic coordinates for proximity searches
- **Operating Hours**: Manage store opening and closing times
- **File Management**: Upload and manage documents, images, and avatars using Cloudinary

### 🔧 Technical Features
- **RESTful API**: Well-structured API with versioning (/api/v1)
- **JWT Authentication**: Secure token-based authentication with access and refresh tokens
- **Role-Based Access Control**: Different permissions for customers and stores
- **File Upload**: Support for image uploads with Cloudinary integration
- **CORS Support**: Cross-origin resource sharing enabled
- **Database Pagination**: Aggregate pagination for large datasets
- **Firebase Integration**: Backend support for notifications and real-time features

## 💻 Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime environment |
| **Express.js** (v5.2.1) | Web application framework |
| **MongoDB** | NoSQL database |
| **Mongoose** (v9.6.2) | MongoDB ODM and schema validation |
| **JWT** (jsonwebtoken v9.0.3) | Token-based authentication |
| **Bcrypt** (v6.0.0) | Password hashing and security |
| **Multer** (v2.2.0) | File upload handling |
| **Cloudinary** (v2.10.0) | Cloud image storage and management |
| **Firebase Admin** (v13.10.0) | Backend Firebase services |
| **CORS** (v2.8.6) | Cross-origin resource sharing |
| **Cookie Parser** (v1.4.7) | Cookie handling middleware |
| **Dotenv** (v17.4.2) | Environment variable management |
| **Nodemon** | Development server auto-reload |

### Frontend
| Technology | Purpose |
|------------|---------|
| **React** (v19.2.6) | UI library and component framework |
| **Vite** (v8.0.12) | Modern build tool and dev server |
| **React Router** (v6.30.3) | Client-side routing |
| **Axios** (v1.18.1) | HTTP client for API calls |
| **React DOM** (v19.2.6) | React rendering library |
| **ESLint** | Code quality and style checking |

## 📁 Project Structure

```
PharmaSee/
├── backend/                          # Express.js server
│   ├── src/
│   │   ├── app.js                   # Express app configuration
│   │   ├── index.js                 # Server entry point
│   │   ├── constants.js             # App constants
│   │   ├── controllers/             # Route controllers
│   │   │   ├── customer.controller.js
│   │   │   ├── store.controller.js
│   │   │   ├── doctor.controller.js
│   │   │   ├── test.controller.js
│   │   │   └── post.controller.js
│   │   ├── routes/                  # API routes
│   │   │   ├── customer.routes.js
│   │   │   ├── store.routes.js
│   │   │   ├── doctor.routes.js
│   │   │   ├── test.routes.js
│   │   │   └── post.routes.js
│   │   ├── models/                  # Mongoose schemas
│   │   │   ├── customer.models.js
│   │   │   ├── store.models.js
│   │   │   ├── doctor.models.js
│   │   │   ├── test.models.js
│   │   │   ├── post.models.js
│   │   │   ├── booking.models.js
│   │   │   ├── payment.models.js
│   │   │   ├── report.models.js
│   │   │   ├── response.models.js
│   │   │   └── textRequest.models.js
│   │   ├── middlewares/             # Custom middleware
│   │   │   ├── auth.middleware.js
│   │   │   ├── multer.middleware.js
│   │   │   └── ownerVerify.middleware.js
│   │   ├── db/                      # Database configuration
│   │   └── utils/                   # Utility functions
│   │       ├── ApiError.js
│   │       ├── ApiResponse.js
│   │       ├── asyncHandler.js
│   │       ├── cloudinary.js
│   │       └── firebase.js
│   ├── public/                      # Static files
│   ├── package.json
│   ├── api_doc.md                   # API documentation
│   └── serviceAccountKey.json       # Firebase credentials
│
├── frontend/                         # React application
│   ├── src/
│   │   ├── App.jsx                  # Main app component
│   │   ├── main.jsx                 # Entry point
│   │   ├── index.css                # Global styles
│   │   ├── api/                     # API client configuration
│   │   │   ├── axios.js
│   │   │   ├── customer.js
│   │   │   └── store.js
│   │   ├── components/              # Reusable components
│   │   │   ├── TopNav.jsx
│   │   │   └── sidebar.jsx
│   │   └── pages/                   # Page components
│   │       ├── home.jsx
│   │       ├── LabTests.jsx
│   │       ├── Pharmacy.jsx
│   │       └── Reports.jsx
│   ├── public/                      # Public assets
│   ├── package.json
│   ├── vite.config.js              # Vite configuration
│   └── eslint.config.js            # ESLint configuration
│
└── README.md                        # Project documentation
```

## 🚀 Installation

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **MongoDB** (local or cloud instance)
- **Cloudinary Account** (for image storage)
- **Firebase Project** (for backend services)

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   # Create .env file in backend directory with the following variables:
   ```
   ```env
   # Server Configuration
   PORT=3000
   
   # Database
   MONGODB_URI=mongodb://localhost:27017/PHARMASEE_DB
   
   # JWT Secrets
   ACCESS_TOKEN_SECRET=your_access_token_secret_key_here
   ACCESS_TOKEN_EXPIRY=1d
   REFRESH_TOKEN_SECRET=your_refresh_token_secret_key_here
   REFRESH_TOKEN_EXPIRY=10d
   
   # CORS Configuration
   CORS_ORIGIN=http://localhost:5173
   
   # Cloudinary Configuration
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   
   # Firebase Configuration
   FIREBASE_PROJECT_ID=your_firebase_project_id
   FIREBASE_PRIVATE_KEY=your_firebase_private_key
   FIREBASE_CLIENT_EMAIL=your_firebase_client_email
   ```

4. **Place Firebase Service Account Key**
   - Copy your `serviceAccountKey.json` from Firebase console to the `backend/` directory

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file (if needed)**
   ```bash
   # Create .env file in frontend directory
   ```
   ```env
   VITE_API_BASE_URL=http://localhost:3000/api/v1
   ```

## 🎮 Getting Started

### Running the Development Server

**Backend:**
```bash
cd backend
npm run dev
```
Server will start at `http://localhost:3000`

**Frontend:**
```bash
cd frontend
npm run dev
```
Application will start at `http://localhost:5173`

### Building for Production

**Backend:**
Backend uses Node.js and doesn't require a build step. Simply run:
```bash
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

### Linting

**Frontend:**
```bash
npm run lint
```

## 🔌 API Endpoints

### Base URL
```
http://localhost:3000/api/v1
```

### Customer Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/customers/register` | Register a new customer |
| POST | `/customers/login` | Customer login |
| POST | `/customers/logout` | Customer logout (requires auth) |
| POST | `/customers/refresh-token` | Refresh access token |
| GET | `/customers/current-user` | Get current customer profile (requires auth) |
| POST | `/customers/change-password` | Change password (requires auth) |
| POST | `/customers/update-account` | Update account details (requires auth) |
| POST | `/customers/update-avatar` | Update avatar (requires auth) |

### Store Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/stores/register` | Register a new pharmacy store |
| POST | `/stores/login` | Store login |
| POST | `/stores/logout` | Store logout (requires auth) |
| POST | `/stores/refresh-token` | Refresh access token |
| GET | `/stores/current-store` | Get current store profile (requires auth) |
| POST | `/stores/change-password` | Change password (requires auth) |
| POST | `/stores/update-avatar` | Update avatar (requires auth) |
| POST | `/stores/update-contact` | Update contact details (requires auth) |
| POST | `/stores/update-username` | Update username (requires auth) |
| POST | `/stores/update-store` | Update store details (requires auth) |
| GET | `/stores/:storeId` | Get store details (requires auth) |
| GET | `/stores/:storeId/doctors` | Get doctors in store (requires auth) |
| GET | `/stores/:storeId/tests` | Get lab tests in store (requires auth) |

### Doctor Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/doctors/create-doctors` | Create new doctor (requires auth) |
| GET | `/doctors/:doctorId` | Get doctor details (requires auth) |
| PATCH | `/doctors/:id/update-details` | Update doctor details (requires auth + owner) |
| PATCH | `/doctors/:id/update-contact` | Update doctor contact (requires auth + owner) |
| PATCH | `/doctors/:id/update-avatar` | Update doctor avatar (requires auth + owner) |
| DELETE | `/doctors/:id` | Delete doctor (requires auth + owner) |

### Lab Test Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/tests/create-test` | Create new lab test (requires auth) |
| GET | `/tests/:testId` | Get test details (requires auth) |
| PATCH | `/tests/:id/update-test` | Update test details (requires auth + owner) |
| DELETE | `/tests/:id` | Delete test (requires auth + owner) |

### Post & Request Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/posts/create-post` | Create a post with image (requires auth) |
| POST | `/posts/create-text-request` | Create a text request (requires auth) |

## 📊 Database Models

### Customer Schema
- `username` (String, unique, required)
- `email` (String, unique, required)
- `phoneNumber` (String, unique, required)
- `fullName` (String, required)
- `avatar` (String)
- `password` (String, hashed)
- `refreshToken` (String)
- Timestamps (createdAt, updatedAt)

### Store Schema
- `username` (String, unique, required)
- `email` (String, unique, required)
- `ownerName` (String, required)
- `phoneNumber` (String, unique, required)
- `avatar` (String)
- `openTime` (String)
- `closeTime` (String)
- `location` (GeoJSON Point with coordinates)
- `password` (String, hashed)
- `refreshToken` (String)
- `fcmToken` (String)
- Timestamps (createdAt, updatedAt)

### Doctor Schema
- Doctor details linked to stores
- Includes profile information, contact details, and avatar
- Owner verification for modifications

### Test Schema
- Lab test information
- Linked to pharmacy stores
- Update and delete controls

### Additional Models
- **Booking**: Customer appointments and test bookings
- **Payment**: Payment transaction records
- **Report**: Medical report storage
- **Response**: Customer responses and feedback
- **Post**: Pharmacy posts and announcements
- **TextRequest**: Direct customer-to-pharmacy text inquiries

## ⚙️ Configuration

### Environment Variables

**Backend (.env)**
- `PORT`: Server port (default: 3000)
- `MONGODB_URI`: MongoDB connection string
- `ACCESS_TOKEN_SECRET`: JWT access token secret
- `ACCESS_TOKEN_EXPIRY`: Token expiration (e.g., "1d")
- `REFRESH_TOKEN_SECRET`: JWT refresh token secret
- `REFRESH_TOKEN_EXPIRY`: Refresh token expiration (e.g., "10d")
- `CORS_ORIGIN`: Frontend URL for CORS
- `CLOUDINARY_*`: Cloudinary credentials for image storage
- `FIREBASE_*`: Firebase configuration for backend services

**Frontend (.env)**
- `VITE_API_BASE_URL`: Backend API base URL

### Database Configuration
The application uses MongoDB with Mongoose ODM. Database name is set to `PHARMASEE_DB`.

**Indexes:**
- Store location uses 2dsphere index for geospatial queries
- Username, email fields are indexed for faster queries

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Standards
- Use ESLint for frontend code quality
- Follow the existing project structure
- Write meaningful commit messages
- Test your changes thoroughly

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Otsur Pegu**

---

## 🙏 Acknowledgments

- Express.js and Vite communities
- MongoDB and Mongoose documentation
- Cloudinary for image hosting
- Firebase for backend services

## 📞 Support

For issues, questions, or suggestions, please open an issue in the repository or contact the author.

---

**Last Updated:** 2026  
**Status:** Active Development

*In a busy world, we waste precious time searching for medicines and pharmacies. PharmaSee brings everything to you — instantly.* 🚀






## run

-npm run dev