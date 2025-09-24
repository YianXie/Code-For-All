// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
    FORGOT_PASSWORD: '/api/auth/forgot-password',
    RESET_PASSWORD: '/api/auth/reset-password'
  },
  USERS: {
    PROFILE: '/api/users/profile',
    UPDATE_PROFILE: '/api/users/profile',
    CHANGE_PASSWORD: '/api/users/change-password'
  },
  COURSES: {
    LIST: '/api/courses',
    DETAIL: (id) => `/api/courses/${id}`,
    ENROLL: (id) => `/api/courses/${id}/enroll`,
    UNENROLL: (id) => `/api/courses/${id}/unenroll`
  },
  EVENTS: {
    LIST: '/api/events',
    DETAIL: (id) => `/api/events/${id}`,
    REGISTER: (id) => `/api/events/${id}/register`,
    UNREGISTER: (id) => `/api/events/${id}/unregister`
  },
  CONTACT: {
    SUBMIT: '/api/contact/submit'
  }
};

// Application routes
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  EVENTS: '/events',
  TEAM: '/team',
  CONTACT: '/contact',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  DASHBOARD: '/dashboard'
};

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'cfa_auth_token',
  REFRESH_TOKEN: 'cfa_refresh_token',
  USER_PREFERENCES: 'cfa_user_preferences',
  THEME: 'cfa_theme',
  LANGUAGE: 'cfa_language'
};

// Theme configuration
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system'
};

// Breakpoints (matching Tailwind CSS)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536
};

// Form validation messages
export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  PASSWORD_TOO_SHORT: 'Password must be at least 8 characters long',
  PASSWORDS_DONT_MATCH: 'Passwords do not match',
  INVALID_PHONE: 'Please enter a valid phone number',
  INVALID_URL: 'Please enter a valid URL'
};

// Event categories
export const EVENT_CATEGORIES = {
  WORKSHOP: 'workshop',
  BOOTCAMP: 'bootcamp',
  WEBINAR: 'webinar',
  HACKATHON: 'hackathon',
  MEETUP: 'meetup'
};

// Skill levels
export const SKILL_LEVELS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
  EXPERT: 'expert'
};

// Programming languages and technologies
export const TECHNOLOGIES = {
  JAVASCRIPT: 'JavaScript',
  PYTHON: 'Python',
  JAVA: 'Java',
  CSHARP: 'C#',
  CPP: 'C++',
  REACT: 'React',
  VUE: 'Vue.js',
  ANGULAR: 'Angular',
  NODE: 'Node.js',
  EXPRESS: 'Express.js',
  DJANGO: 'Django',
  FLASK: 'Flask',
  SPRING: 'Spring Boot',
  MYSQL: 'MySQL',
  POSTGRESQL: 'PostgreSQL',
  MONGODB: 'MongoDB',
  REDIS: 'Redis',
  AWS: 'AWS',
  AZURE: 'Azure',
  GCP: 'Google Cloud',
  DOCKER: 'Docker',
  KUBERNETES: 'Kubernetes',
  GIT: 'Git',
  HTML: 'HTML',
  CSS: 'CSS',
  SASS: 'Sass',
  TAILWIND: 'Tailwind CSS',
  TYPESCRIPT: 'TypeScript'
};

// Social media platforms
export const SOCIAL_PLATFORMS = {
  FACEBOOK: 'facebook',
  TWITTER: 'twitter',
  LINKEDIN: 'linkedin',
  GITHUB: 'github',
  INSTAGRAM: 'instagram',
  YOUTUBE: 'youtube',
  DISCORD: 'discord'
};

// Contact inquiry types
export const INQUIRY_TYPES = {
  GENERAL: 'general',
  ENROLLMENT: 'enrollment',
  TECHNICAL: 'technical',
  PARTNERSHIP: 'partnership',
  CAREER: 'career',
  OTHER: 'other'
};