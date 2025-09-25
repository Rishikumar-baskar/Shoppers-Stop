# Shoppers Stop - E-commerce Application

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) e-commerce application with admin panel.

## Features

- User authentication and authorization
- Product management
- Shopping cart functionality
- Order management
- Payment integration (Stripe)
- Admin dashboard
- Email notifications
- Review system

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Git

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd shoppers-stop
   ```

2. **Install dependencies:**
   ```bash
   # Install backend dependencies
   npm install

   # Install frontend dependencies
   cd frontend
   npm install
   cd ..
   ```

3. **Environment Configuration:**

   Copy the example environment file and configure your settings:
   ```bash
   cp .env.example .env
   ```

   Edit the `.env` file with your actual configuration values:

   ```env
   # Server Configuration
   PORT=8000
   NODE_ENV=development

   # Database
   DB_LOCAL_URI=mongodb://127.0.0.1:27017/shoppersstop

   # JWT Configuration
   JWT_SECRET=your_secure_jwt_secret_here
   JWT_EXPIRES_TIME=7d
   COOKIE_EXPIRES_TIME=7

   # SMTP Configuration (Email)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_gmail_app_password_here
   SMTP_FROM_NAME=Shoppers Stop
   SMTP_FROM_EMAIL=your_email@gmail.com

   # Application URLs
   BACKEND_URL=http://127.0.0.1:8000
   FRONTEND_URL=http://127.0.0.1:3000

   # Stripe Payment Configuration
   STRIPE_API_KEY=pk_test_your_stripe_publishable_key
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
   ```

   **Important Security Notes:**
   - Never commit the `.env` file to version control
   - Use strong, unique secrets for JWT and other sensitive data
   - For Gmail SMTP, use an "App Password" instead of your regular password

4. **Database Setup:**

   Start MongoDB and run the seeder to populate initial data:
   ```bash
   npm run seeder
   ```

5. **Start the Application:**

   ```bash
   # Start backend server (development mode)
   npm run dev

   # In another terminal, start frontend
   cd frontend
   npm start
   ```

   The application will be available at:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000

## Gmail SMTP Setup

To enable email functionality:

1. Enable 2-factor authentication on your Gmail account
2. Generate an "App Password" in Google Account settings
3. Use the App Password (not your regular password) for `SMTP_PASS`

## Default Admin Credentials

- Email: `admin@shoppersstop.com`
- Password: `123456`

## Project Structure

```
shoppers-stop/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── utils/
│   └── config/
├── frontend/
│   └── src/
│       ├── components/
│       ├── actions/
│       ├── slices/
│       └── utils/
├── .env.example
├── .gitignore
└── README.md
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run prod` - Start production server
- `npm run seeder` - Seed database with initial data

## Technologies Used

- **Frontend:** React.js, Redux Toolkit, React Router, Bootstrap
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JWT
- **Payment:** Stripe
- **Email:** Nodemailer
- **File Upload:** Multer

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the ISC License.