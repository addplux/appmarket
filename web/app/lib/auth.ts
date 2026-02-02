import api from './api';

export interface User {
    id: number;
    username: string;
    email: string;
    user_type: string;
    first_name?: string;
    last_name?: string;
    date_joined: string;
}

export interface AuthResponse {
    user: User;
    access: string;
    refresh: string;
    message: string;
}

export interface RegisterData {
    username: string;
    email: string;
    password: string;
    password_confirm: string;
    user_type: string;
    first_name?: string;
    last_name?: string;
}

export interface LoginData {
    username: string;
    password: string;
}

/**
 * Register a new user
 */
export const register = async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post('/auth/register/', data);
    const authData = response.data;

    // Store tokens and user data
    if (typeof window !== 'undefined') {
        localStorage.setItem('access_token', authData.access);
        localStorage.setItem('refresh_token', authData.refresh);
        localStorage.setItem('user', JSON.stringify(authData.user));
    }

    return authData;
};

/**
 * Login user
 */
export const login = async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post('/auth/login/', data);
    const authData = response.data;

    // Store tokens and user data
    if (typeof window !== 'undefined') {
        localStorage.setItem('access_token', authData.access);
        localStorage.setItem('refresh_token', authData.refresh);
        localStorage.setItem('user', JSON.stringify(authData.user));
    }

    return authData;
};

/**
 * Logout user
 */
export const logout = async (): Promise<void> => {
    if (typeof window !== 'undefined') {
        const refreshToken = localStorage.getItem('refresh_token');

        try {
            if (refreshToken) {
                await api.post('/auth/logout/', { refresh: refreshToken });
            }
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Clear local storage regardless of API call success
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('user');
        }
    }
};

/**
 * Get current authenticated user
 */
export const getCurrentUser = async (): Promise<User> => {
    const response = await api.get('/auth/me/');
    return response.data;
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
    if (typeof window !== 'undefined') {
        return !!localStorage.getItem('access_token');
    }
    return false;
};

/**
 * Get stored user data
 */
export const getStoredUser = (): User | null => {
    if (typeof window !== 'undefined') {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            try {
                return JSON.parse(userStr);
            } catch {
                return null;
            }
        }
    }
    return null;
};
