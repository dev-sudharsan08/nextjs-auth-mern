# MERN Stack Authentication & Task Management App

A full-stack web application built with Next.js, MongoDB, Express.js, and React featuring user authentication, email verification, password reset, and task management.

## Features

### Authentication
- ✅ User registration with email verification
- ✅ User login with JWT tokens
- ✅ Email verification system
- ✅ Password reset functionality
- ✅ Protected routes with middleware
- ✅ Secure cookie-based authentication

### Task Management
- ✅ Create, read, update, and delete tasks
- ✅ Task priority levels (Low, Medium, High)
- ✅ Task status tracking (To Do, In Progress, Done)
- ✅ Due date management
- ✅ User-specific task isolation

### UI/UX
- ✅ Modern, responsive design with Tailwind CSS
- ✅ Loading states and error handling
- ✅ Form validation
- ✅ Mobile-friendly interface

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT tokens, bcryptjs
- **Email**: Nodemailer with Mailtrap
- **Styling**: Tailwind CSS

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- Mailtrap account (for email testing)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd next-mern-proj
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017
   MONGODB_NAME=mern_auth_app

   # JWT Configuration
   TOKEN_SECRET=your_super_secret_jwt_token_key_here_make_it_long_and_secure
   REFRESH_TOKEN_SECRET=your_super_secret_refresh_token_key_here_make_it_long_and_secure

   # Email Configuration (using Mailtrap for development)
   NODEMAILER_USERID=your_mailtrap_user_id
   NODEMAILER_PASSWORD=your_mailtrap_password
   DOMAIN=http://localhost:3000

   # Next.js Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret_key_here
   ```

4. **Set up MongoDB**
   - Install MongoDB locally or use MongoDB Atlas
   - Update the `MONGODB_URI` in your `.env.local` file

5. **Set up Mailtrap (for email testing)**
   - Create a free account at [Mailtrap.io](https://mailtrap.io)
   - Get your credentials and update the email configuration in `.env.local`

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── users/
│   │       ├── details/route.ts
│   │       ├── login/routes.ts
│   │       ├── logout/route.ts
│   │       ├── signup/route.ts
│   │       ├── tasks/
│   │       │   ├── route.ts
│   │       │   └── [id]/route.ts
│   │       ├── verifyemail/route.ts
│   │       ├── forgot-password/route.ts
│   │       └── reset-password/route.ts
│   ├── components/
│   │   └── reusable/
│   │       ├── alert/alert.tsx
│   │       └── spinner/spinner.tsx
│   ├── login/page.tsx
│   ├── signup/page.tsx
│   ├── profile/page.tsx
│   ├── verify-email/page.tsx
│   ├── forgot-password/page.tsx
│   ├── reset-password/page.tsx
│   ├── page.tsx
│   └── layout.tsx
├── dbConfig/
│   └── dbConfig.ts
├── helpers/
│   ├── getDataFromToken.ts
│   └── mailer.ts
├── models/
│   ├── usermodel.ts
│   └── taskMode.ts
└── middleware.ts
```

## API Endpoints

### Authentication
- `POST /api/users/signup` - User registration
- `POST /api/users/login` - User login
- `GET /api/users/logout` - User logout
- `GET /api/users/details` - Get user details
- `POST /api/users/verifyemail` - Verify email
- `POST /api/users/forgot-password` - Send password reset email
- `POST /api/users/reset-password` - Reset password

### Tasks
- `GET /api/users/tasks` - Get user tasks
- `POST /api/users/tasks` - Create new task
- `PUT /api/users/tasks/[id]` - Update task
- `DELETE /api/users/tasks/[id]` - Delete task

## Usage

### User Registration
1. Navigate to `/signup`
2. Fill in username, email, and password
3. Check your email for verification link
4. Click the verification link to activate your account

### User Login
1. Navigate to `/login`
2. Enter your email and password
3. You'll be redirected to the dashboard

### Task Management
1. After logging in, you'll see your dashboard
2. Click "Add New Task" to create a task
3. Fill in task details (title, description, priority, due date)
4. View and manage your tasks

### Password Reset
1. On the login page, click "Forgot your password?"
2. Enter your email address
3. Check your email for reset instructions
4. Follow the link to reset your password

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- HTTP-only cookies for token storage
- Email verification for account activation
- Secure password reset with time-limited tokens
- Protected routes with middleware

## Development

### Running Tests
```bash
npm run test
```

### Building for Production
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

## Future Enhancements

- [ ] Task categories and tags
- [ ] Task sharing and collaboration
- [ ] File attachments for tasks
- [ ] Task notifications and reminders
- [ ] Advanced filtering and search
- [ ] Task templates
- [ ] Team management features
- [ ] Mobile app (React Native)
- [ ] Real-time updates with WebSockets
- [ ] Task analytics and reporting
