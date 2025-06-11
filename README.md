# Online Therapy Clinic Backend | بک‌اند کلینیک درمان آنلاین

A comprehensive backend system for an online psychology clinic, built with Express.js and PostgreSQL.
سیستم جامع بک‌اند برای کلینیک روانشناسی آنلاین، ساخته شده با Express.js و PostgreSQL.

## Features 

- 🔐 Secure authentication and authorization 
- 👥 User management (Clients, Therapists, Admins)
- 💬 AI-powered initial assessment chat
- 📅 Appointment scheduling and management
- 📝 Session notes and progress tracking 
- 📧 Email notifications 
- 🔔 Real-time notifications 
- 🌐 Multi-language support
- 📱 File upload and management 
- 📊 SEO optimization 
- 📝 Blog system with CMS 
- 📈 Analytics and reporting 

## Tech Stack 
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Sequelize
- **Authentication:** JWT
- **Real-time:** Socket.IO
- **File Upload:** Multer
- **Email:** Nodemailer
- **AI Integration:** OpenAI API
- **Logging:** Winston
- **Documentation:** Swagger
- **Internationalization:** i18next

## Prerequisites 

- Node.js (v14 or higher 
- PostgreSQL (v12 or higher 
- Redis (for session management)
- SMTP server (for email notifications)

## Installation 

1. Clone the repository 

   ```bash
   git clone https://github.com/yourusername/online-therapy-clinic.git
   cd online-therapy-clinic
   ```

2. Install dependencies | نصب وابستگی‌ها:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory 

   ```env
   # Server Configuration 
   PORT=3000
   NODE_ENV=development

   # Database Configuration 
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=online_therapy
   DB_USER=postgres
   DB_PASSWORD=your_password

   # JWT Configuration 
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=24h

   # Email Configuration 
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_specific_password

   # AI Configuration 
   AI_API_KEY=your_openai_api_key
   AI_MODEL=gpt-4

   # File Upload 
   UPLOAD_DIR=uploads
   MAX_FILE_SIZE=5242880
   ```

4. Initialize the database 

   ```bash
   npm run db:init
   ```

5. Start the development server 
   ```bash
   npm run dev
   ```

## API Documentation | مستندات API

The API documentation is available at `/api-docs` when the server is running. It provides detailed information about all available endpoints, request/response formats, and authentication requirements.


## Project Structure 

```
src/
├── config/         # Configuration files 
├── middleware/     # Express middleware 
├── models/         # Database models
├── routes/         # API routes 
├── services/       # Business logic 
├── utils/          # Utility functions
└── index.js        # Application entry point
```

## Key Features 
### Authentication & Authorization 

- JWT-based authentication 
- Role-based access control 
- Secure password hashing 
- Session management 

### AI-Powered Assessment 

- Chat-based initial assessment 
- Intelligent therapist matching 
- Risk assessment
- Progress tracking 

### Appointment Management

- Real-time scheduling
- Calendar integration
- Automated reminders 
- Session notes 

### Multi-language Support 

- English and French languages 
- Dynamic content translation 
- Language detection 


### File Management

- Secure file uploads 
- File type validation 
- Size restrictions 
- Organized storage 

### SEO Optimization 

- Dynamic meta tags 
- Sitemap generation 
- Robots.txt 
- Keyword optimization



## License 

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## Support | پشتیبانی

For support, email support@onlinetherapyclinic.com or create an issue in the repository.
برای پشتیبانی، به آدرس support@onlinetherapyclinic.com ایمیل بزنید یا یک issue در مخزن ایجاد کنید.
