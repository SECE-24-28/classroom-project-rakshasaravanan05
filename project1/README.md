# Campus Issue Reporting System

A complete MERN Stack web application for reporting and managing campus issues with session-based authentication.

## Features

### Student Features
- Register and login with session-based authentication
- Report new issues with image upload
- View and track personal issues
- Real-time status updates (Pending, In Progress, Resolved)

### Admin Features
- View all reported issues
- Filter issues by category and status
- Update issue status and add comments
- Manage issue resolution

### Technical Features
- Session-based authentication (no JWT)
- Image upload and storage
- Responsive design
- Role-based access control
- RESTful API design

## Tech Stack

- **Frontend**: React.js with TypeScript, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: express-session
- **File Upload**: Multer
- **Styling**: CSS3 with modern design

## Project Structure

```
project1/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context
│   │   └── utils/          # API utilities
├── server/                 # Node.js backend
│   ├── controllers/        # Route controllers
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   └── uploads/            # Image storage
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/campus-issues
SESSION_SECRET=your-super-secret-session-key-change-this-in-production
```

4. Create admin user:
```bash
node createAdmin.js
```

5. Start the server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the React app:
```bash
npm start
```

### Database Setup

1. Install MongoDB locally or use MongoDB Atlas
2. Create a database named `campus-issues`
3. The application will automatically create collections

## Usage

### Demo Credentials

**Admin Account:**
- Email: admin@campus.edu
- Password: admin123

**Student Account:**
- Register a new account or create test accounts

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

#### Issues
- `POST /api/issues` - Create new issue
- `GET /api/issues/my` - Get user's issues
- `GET /api/issues/all` - Get all issues (admin)
- `PUT /api/issues/:id` - Update issue status (admin)

## Database Models

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (student/admin),
  timestamps: true
}
```

### Issue Model
```javascript
{
  title: String,
  description: String,
  category: String,
  location: String,
  image: String,
  status: String,
  user: ObjectId (ref: User),
  adminComment: String,
  timestamps: true
}
```

## Development

### Running in Development Mode

1. Start MongoDB service
2. Run backend: `cd server && npm run dev`
3. Run frontend: `cd client && npm start`
4. Access application at `http://localhost:3000`

### Building for Production

1. Build React app:
```bash
cd client && npm run build
```

2. Serve static files from Express server
3. Set environment variables for production
4. Use process manager like PM2

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please create an issue in the repository.