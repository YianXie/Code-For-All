import { API_ENDPOINTS } from '../utils/constants';

// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('cfa_auth_token');
  }

  // Set authentication token
  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('cfa_auth_token', token);
    } else {
      localStorage.removeItem('cfa_auth_token');
    }
  }

  // Get default headers
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    return headers;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      
      return await response.text();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // GET request
  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  // POST request
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT request
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }

  // Authentication methods
  async login(credentials) {
    const response = await this.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
    if (response.token) {
      this.setToken(response.token);
    }
    return response;
  }

  async register(userData) {
    return this.post(API_ENDPOINTS.AUTH.REGISTER, userData);
  }

  async logout() {
    try {
      await this.post(API_ENDPOINTS.AUTH.LOGOUT);
    } finally {
      this.setToken(null);
    }
  }

  async refreshToken() {
    const refreshToken = localStorage.getItem('cfa_refresh_token');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await this.post(API_ENDPOINTS.AUTH.REFRESH, {
      refreshToken,
    });

    if (response.token) {
      this.setToken(response.token);
    }

    return response;
  }

  // User methods
  async getUserProfile() {
    return this.get(API_ENDPOINTS.USERS.PROFILE);
  }

  async updateUserProfile(userData) {
    return this.put(API_ENDPOINTS.USERS.UPDATE_PROFILE, userData);
  }

  async changePassword(passwordData) {
    return this.post(API_ENDPOINTS.USERS.CHANGE_PASSWORD, passwordData);
  }

  // Course methods
  async getCourses(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    const endpoint = queryParams ? `${API_ENDPOINTS.COURSES.LIST}?${queryParams}` : API_ENDPOINTS.COURSES.LIST;
    return this.get(endpoint);
  }

  async getCourse(id) {
    return this.get(API_ENDPOINTS.COURSES.DETAIL(id));
  }

  async enrollInCourse(id) {
    return this.post(API_ENDPOINTS.COURSES.ENROLL(id));
  }

  async unenrollFromCourse(id) {
    return this.delete(API_ENDPOINTS.COURSES.UNENROLL(id));
  }

  // Event methods
  async getEvents(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    const endpoint = queryParams ? `${API_ENDPOINTS.EVENTS.LIST}?${queryParams}` : API_ENDPOINTS.EVENTS.LIST;
    return this.get(endpoint);
  }

  async getEvent(id) {
    return this.get(API_ENDPOINTS.EVENTS.DETAIL(id));
  }

  async registerForEvent(id) {
    return this.post(API_ENDPOINTS.EVENTS.REGISTER(id));
  }

  async unregisterFromEvent(id) {
    return this.delete(API_ENDPOINTS.EVENTS.UNREGISTER(id));
  }

  // Contact methods
  async submitContactForm(formData) {
    return this.post(API_ENDPOINTS.CONTACT.SUBMIT, formData);
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;

// Export individual methods for convenience
export const {
  login,
  register,
  logout,
  refreshToken,
  getUserProfile,
  updateUserProfile,
  changePassword,
  getCourses,
  getCourse,
  enrollInCourse,
  unenrollFromCourse,
  getEvents,
  getEvent,
  registerForEvent,
  unregisterFromEvent,
  submitContactForm,
} = apiService;