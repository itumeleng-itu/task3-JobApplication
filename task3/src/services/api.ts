// API Service for JSON Server Backend
const API_BASE_URL = 'http://localhost:3001';

// Types
export interface Job {
    id: number;
    title: string;
    department: string;
    location: string;
    salary: string;
}

export interface Application {
    id?: number;
    jobId: number;
    jobTitle: string;
    date: string;
    status: 'pending' | 'approved' | 'rejected';
    userId?: string;
}

export interface User {
    id?: number;
    name: string;
    email?: string;
    password: string;
}

// Jobs API
export const jobsApi = {
    // Get all jobs
    getAll: async (): Promise<Job[]> => {
        try {
            const response = await fetch(`${API_BASE_URL}/jobs`);
            if (!response.ok) throw new Error('Failed to fetch jobs');
            return response.json();
        } catch (error) {
            return [];
        }
    },

    // Get job by ID
    getById: async (id: number): Promise<Job | null> => {
        try {
            const response = await fetch(`${API_BASE_URL}/jobs/${id}`);
            if (!response.ok) throw new Error('Job not found');
            return response.json();
        } catch (error) {
            return null;
        }
    },

    // Search jobs
    search: async (query: string): Promise<Job[]> => {
        try {
            const response = await fetch(`${API_BASE_URL}/jobs?q=${encodeURIComponent(query)}`);
            if (!response.ok) throw new Error('Search failed');
            return response.json();
        } catch (error) {
            return [];
        }
    },

    // Filter jobs by department or location
    filter: async (department?: string, location?: string): Promise<Job[]> => {
        try {
            let url = `${API_BASE_URL}/jobs?`;
            if (department) url += `department=${encodeURIComponent(department)}&`;
            if (location) url += `location=${encodeURIComponent(location)}`;
            const response = await fetch(url);
            if (!response.ok) throw new Error('Filter failed');
            return response.json();
        } catch (error) {
            return [];
        }
    }
};

// Applications API
export const applicationsApi = {
    // Get all applications
    getAll: async (): Promise<Application[]> => {
        try {
            const response = await fetch(`${API_BASE_URL}/applications`);
            if (!response.ok) throw new Error('Failed to fetch applications');
            return response.json();
        } catch (error) {
            // Fallback to localStorage
            const saved = localStorage.getItem('jobApplications');
            return saved ? JSON.parse(saved) : [];
        }
    },

    // Create application
    create: async (application: Omit<Application, 'id'>): Promise<Application | null> => {
        try {
            const response = await fetch(`${API_BASE_URL}/applications`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(application)
            });
            if (!response.ok) throw new Error('Failed to create application');
            const newApp = await response.json();

            // Also save to localStorage as backup
            const saved = localStorage.getItem('jobApplications');
            const apps = saved ? JSON.parse(saved) : [];
            apps.push({ ...newApp, name: application.jobTitle, date: application.date, status: application.status });
            localStorage.setItem('jobApplications', JSON.stringify(apps));

            return newApp;
        } catch (error) {
            // Fallback to localStorage only
            const saved = localStorage.getItem('jobApplications');
            const apps = saved ? JSON.parse(saved) : [];
            const newApp = { ...application, id: Date.now() };
            apps.push({ ...newApp, name: application.jobTitle });
            localStorage.setItem('jobApplications', JSON.stringify(apps));
            return newApp;
        }
    },

    // Update application status
    updateStatus: async (id: number, status: Application['status']): Promise<Application | null> => {
        try {
            const response = await fetch(`${API_BASE_URL}/applications/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });
            if (!response.ok) throw new Error('Failed to update application');
            return response.json();
        } catch (error) {
            return null;
        }
    },

    // Delete application
    delete: async (id: number): Promise<boolean> => {
        try {
            const response = await fetch(`${API_BASE_URL}/applications/${id}`, {
                method: 'DELETE'
            });
            return response.ok;
        } catch (error) {
            return false;
        }
    }
};

// Users API
export const usersApi = {
    // Register user
    register: async (user: Omit<User, 'id'>): Promise<User | null> => {
        try {
            const response = await fetch(`${API_BASE_URL}/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            });
            if (!response.ok) throw new Error('Failed to register user');
            const newUser = await response.json();
            localStorage.setItem('signInData', JSON.stringify({ name: user.name, password: user.password }));
            return newUser;
        } catch (error) {
            // Fallback to localStorage
            localStorage.setItem('signInData', JSON.stringify({ name: user.name, password: user.password }));
            return user as User;
        }
    },

    // Login user
    login: async (name: string, password: string): Promise<User | null> => {
        try {
            const response = await fetch(`${API_BASE_URL}/users?name=${encodeURIComponent(name)}&password=${encodeURIComponent(password)}`);
            if (!response.ok) throw new Error('Login failed');
            const users = await response.json();
            if (users.length > 0) {
                localStorage.setItem('signInData', JSON.stringify({ name: users[0].name, password: users[0].password }));
                return users[0];
            }
            // Fallback to localStorage
            const savedData = localStorage.getItem('signInData');
            if (savedData) {
                const saved = JSON.parse(savedData);
                if (saved.name === name && saved.password === password) {
                    return saved;
                }
            }
            return null;
        } catch (error) {
            // Fallback to localStorage
            const savedData = localStorage.getItem('signInData');
            if (savedData) {
                const saved = JSON.parse(savedData);
                if (saved.name === name && saved.password === password) {
                    return saved;
                }
            }
            return null;
        }
    }
};

// Auth API (alias for login/signup pages)
export const authApi = {
    getUsers: async (): Promise<Array<{ id?: number; username: string; email?: string; password: string }>> => {
        try {
            const response = await fetch(`${API_BASE_URL}/users`);
            if (!response.ok) throw new Error('Failed to fetch users');
            const users = await response.json();
            // Map 'name' to 'username' for compatibility
            return users.map((u: any) => ({ ...u, username: u.name || u.username }));
        } catch (error) {
            // Fallback to localStorage
            const savedData = localStorage.getItem('signInData');
            if (savedData) {
                const saved = JSON.parse(savedData);
                return [{ username: saved.name, password: saved.password }];
            }
            return [];
        }
    },

    register: async (user: { username: string; email?: string; password: string }): Promise<any> => {
        try {
            const response = await fetch(`${API_BASE_URL}/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: user.username, email: user.email, password: user.password })
            });
            if (!response.ok) throw new Error('Failed to register user');
            const newUser = await response.json();
            localStorage.setItem('signInData', JSON.stringify({ name: user.username, password: user.password }));
            return newUser;
        } catch (error) {
            // Fallback to localStorage
            localStorage.setItem('signInData', JSON.stringify({ name: user.username, password: user.password }));
            return { username: user.username, email: user.email };
        }
    }
};

