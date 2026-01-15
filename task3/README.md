# Job Application Tracker

A modern React TypeScript application for tracking job applications with a beautiful blue and white theme.

## Features

- 🔐 **User Authentication** - Sign up and login functionality
- 💼 **Browse Jobs** - Search and filter available positions
- ⭐ **Personalized Recommendations** - Get job matches based on your profile
- 📋 **Application Tracking** - Monitor the status of your applications
- 📊 **Dashboard** - Overview of your job search progress
- 📱 **Responsive Design** - Works on desktop and mobile devices

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4 with custom blue/white theme
- **Routing**: React Router DOM
- **Animations**: Framer Motion
- **UI Components**: Radix UI
- **Backend**: JSON Server (mock API)
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository
2. Navigate to the task3 directory:
   ```bash
   cd task3
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

#### Option 1: Run Frontend Only (uses localStorage)
```bash
npm run dev
```
This starts only the Vite dev server. Data will be stored in localStorage.

#### Option 2: Run with JSON Server Backend (Recommended)
```bash
npm run dev:full
```
This runs both:
- JSON Server on `http://localhost:3001` (API)
- Vite dev server on `http://localhost:5173` (Frontend)

#### Option 3: Run Servers Separately
Terminal 1 - Start JSON Server:
```bash
npm run server
```

Terminal 2 - Start Frontend:
```bash
npm run dev
```

### Building for Production
```bash
npm run build
npm run preview
```

## Project Structure

```
task3/
├── db.json                 # JSON Server database
├── package.json            # Dependencies and scripts
├── pages/                  # Page components
│   ├── 404.tsx            # Not found page
│   ├── addDetails.tsx     # Profile details form
│   ├── addJob.tsx         # Browse all jobs
│   ├── history.tsx        # Application history
│   ├── Job.tsx            # Job card component
│   ├── login.tsx          # Login page
│   ├── myJobs.tsx         # Personalized job recommendations
│   ├── profile.tsx        # Dashboard
│   ├── sidebar.tsx        # Navigation sidebar
│   └── signup.tsx         # Registration page
├── src/
│   ├── App.tsx            # Main app with routing
│   ├── index.css          # Global styles & theme
│   ├── main.tsx           # Entry point
│   ├── components/ui/     # Reusable UI components
│   └── services/
│       └── api.ts         # API service layer
└── vite.config.ts         # Vite configuration
```

## API Endpoints (JSON Server)

When running with `npm run dev:full`, the following endpoints are available:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /jobs | Get all jobs |
| GET | /jobs/:id | Get job by ID |
| GET | /jobs?q=search | Search jobs |
| GET | /applications | Get all applications |
| POST | /applications | Create application |
| PATCH | /applications/:id | Update application |
| DELETE | /applications/:id | Delete application |
| GET | /users | Get all users |
| POST | /users | Register user |

## Design Features

- **Blue & White Theme**: Professional, clean aesthetic
- **Responsive Layout**: Mobile-first design with sidebar navigation
- **Smooth Animations**: Fade-in and slide animations
- **Status Badges**: Color-coded application statuses
- **Card-based UI**: Modern card components for jobs and applications

## Usage Flow

1. **Sign Up** - Create a new account
2. **Login** - Access your dashboard
3. **Complete Profile** - Add your details (department, location)
4. **Browse Jobs** - View and search available positions
5. **Apply** - Click "Apply Now" on any job
6. **Track Progress** - Monitor applications in History

## License

MIT
