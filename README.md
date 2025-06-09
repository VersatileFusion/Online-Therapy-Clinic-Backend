# Online Therapy Clinic Backend | بک‌اند کلینیک درمان آنلاین

A comprehensive backend system for an online psychology clinic, built with Express.js and PostgreSQL.
سیستم جامع بک‌اند برای کلینیک روانشناسی آنلاین، ساخته شده با Express.js و PostgreSQL.

## Features | ویژگی‌ها

- 🔐 Secure authentication and authorization | احراز هویت و مجوزدهی امن
- 👥 User management (Clients, Therapists, Admins) | مدیریت کاربران (مشتریان، درمانگران، مدیران)
- 💬 AI-powered initial assessment chat | چت ارزیابی اولیه مبتنی بر هوش مصنوعی
- 📅 Appointment scheduling and management | زمان‌بندی و مدیریت قرار ملاقات
- 📝 Session notes and progress tracking | یادداشت‌های جلسه و پیگیری پیشرفت
- 📧 Email notifications | اعلان‌های ایمیلی
- 🔔 Real-time notifications | اعلان‌های بلادرنگ
- 🌐 Multi-language support (English, Persian) | پشتیبانی چند زبانه (انگلیسی، فارسی)
- 📱 File upload and management | آپلود و مدیریت فایل
- 📊 SEO optimization | بهینه‌سازی موتورهای جستجو
- 📝 Blog system with CMS | سیستم وبلاگ با CMS
- 📈 Analytics and reporting | تحلیل و گزارش‌گیری

## Tech Stack | تکنولوژی‌های مورد استفاده

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

## Prerequisites | پیش‌نیازها

- Node.js (v14 or higher | نسخه ۱۴ یا بالاتر)
- PostgreSQL (v12 or higher | نسخه ۱۲ یا بالاتر)
- Redis (for session management | برای مدیریت نشست)
- SMTP server (for email notifications | برای اعلان‌های ایمیلی)

## Installation | نصب

1. Clone the repository | کلون کردن مخزن:

   ```bash
   git clone https://github.com/yourusername/online-therapy-clinic.git
   cd online-therapy-clinic
   ```

2. Install dependencies | نصب وابستگی‌ها:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory | ایجاد فایل `.env` در دایرکتوری اصلی:

   ```env
   # Server Configuration | تنظیمات سرور
   PORT=3000
   NODE_ENV=development

   # Database Configuration | تنظیمات پایگاه داده
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=online_therapy
   DB_USER=postgres
   DB_PASSWORD=your_password

   # JWT Configuration | تنظیمات JWT
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=24h

   # Email Configuration | تنظیمات ایمیل
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_specific_password

   # AI Configuration | تنظیمات هوش مصنوعی
   AI_API_KEY=your_openai_api_key
   AI_MODEL=gpt-4

   # File Upload | آپلود فایل
   UPLOAD_DIR=uploads
   MAX_FILE_SIZE=5242880
   ```

4. Initialize the database | راه‌اندازی پایگاه داده:

   ```bash
   npm run db:init
   ```

5. Start the development server | شروع سرور توسعه:
   ```bash
   npm run dev
   ```

## API Documentation | مستندات API

The API documentation is available at `/api-docs` when the server is running. It provides detailed information about all available endpoints, request/response formats, and authentication requirements.
مستندات API در آدرس `/api-docs` در دسترس است. این مستندات اطلاعات دقیقی درباره تمام نقاط پایانی موجود، فرمت‌های درخواست/پاسخ و نیازمندی‌های احراز هویت ارائه می‌دهد.

## Project Structure | ساختار پروژه

```
src/
├── config/         # Configuration files | فایل‌های پیکربندی
├── middleware/     # Express middleware | میدلورهای Express
├── models/         # Database models | مدل‌های پایگاه داده
├── routes/         # API routes | مسیرهای API
├── services/       # Business logic | منطق کسب و کار
├── utils/          # Utility functions | توابع کمکی
└── index.js        # Application entry point | نقطه ورود برنامه
```

## Key Features | ویژگی‌های کلیدی

### Authentication & Authorization | احراز هویت و مجوزدهی

- JWT-based authentication | احراز هویت مبتنی بر JWT
- Role-based access control | کنترل دسترسی مبتنی بر نقش
- Secure password hashing | هش کردن امن رمز عبور
- Session management | مدیریت نشست

### AI-Powered Assessment | ارزیابی مبتنی بر هوش مصنوعی

- Chat-based initial assessment | ارزیابی اولیه مبتنی بر چت
- Intelligent therapist matching | تطبیق هوشمند درمانگر
- Risk assessment | ارزیابی ریسک
- Progress tracking | پیگیری پیشرفت

### Appointment Management | مدیریت قرار ملاقات

- Real-time scheduling | زمان‌بندی بلادرنگ
- Calendar integration | یکپارچه‌سازی تقویم
- Automated reminders | یادآوری خودکار
- Session notes | یادداشت‌های جلسه

### Multi-language Support | پشتیبانی چند زبانه

- English and Persian languages | زبان‌های انگلیسی و فارسی
- Dynamic content translation | ترجمه پویای محتوا
- Language detection | تشخیص زبان
- RTL support | پشتیبانی از راست به چپ

### File Management | مدیریت فایل

- Secure file uploads | آپلود امن فایل
- File type validation | اعتبارسنجی نوع فایل
- Size restrictions | محدودیت‌های اندازه
- Organized storage | ذخیره‌سازی منظم

### SEO Optimization | بهینه‌سازی موتورهای جستجو

- Dynamic meta tags | متاتگ‌های پویا
- Sitemap generation | تولید نقشه سایت
- Robots.txt | فایل robots.txt
- Keyword optimization | بهینه‌سازی کلمات کلیدی

## Contributing | مشارکت

1. Fork the repository | فورک کردن مخزن
2. Create your feature branch | ایجاد شاخه ویژگی خود
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Commit your changes | ثبت تغییرات خود
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. Push to the branch | ارسال به شاخه
   ```bash
   git push origin feature/amazing-feature
   ```
5. Open a Pull Request | ایجاد درخواست ادغام

## License | مجوز

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
این پروژه تحت مجوز MIT منتشر شده است - برای جزئیات به فایل [LICENSE](LICENSE) مراجعه کنید.

## Support | پشتیبانی

For support, email support@onlinetherapyclinic.com or create an issue in the repository.
برای پشتیبانی، به آدرس support@onlinetherapyclinic.com ایمیل بزنید یا یک issue در مخزن ایجاد کنید.
