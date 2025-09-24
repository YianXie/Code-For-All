import { createContext, useContext, useReducer, useEffect } from 'react';
import apiService from '../services/api';
import { STORAGE_KEYS } from '../utils/constants';

// Initial state
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

// Action types
const ActionTypes = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  SET_USER: 'SET_USER',
  SET_LOADING: 'SET_LOADING',
  CLEAR_ERROR: 'CLEAR_ERROR',
};

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };

    case ActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload.error,
      };

    case ActionTypes.LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };

    case ActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload.user,
        isLoading: false,
      };

    case ActionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };

    case ActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// Create context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize auth state on app load
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      
      if (token) {
        try {
          apiService.setToken(token);
          const user = await apiService.getUserProfile();
          
          dispatch({
            type: ActionTypes.LOGIN_SUCCESS,
            payload: { user, token },
          });
        } catch (error) {
          console.error('Failed to initialize auth:', error);
          localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
          localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
          dispatch({ type: ActionTypes.LOGOUT });
        }
      } else {
        dispatch({ type: ActionTypes.SET_LOADING, payload: { isLoading: false } });
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (credentials) => {
    dispatch({ type: ActionTypes.LOGIN_START });

    try {
      const response = await apiService.login(credentials);
      
      // Store tokens
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.token);
      if (response.refreshToken) {
        localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.refreshToken);
      }

      dispatch({
        type: ActionTypes.LOGIN_SUCCESS,
        payload: {
          user: response.user,
          token: response.token,
        },
      });

      return response;
    } catch (error) {
      dispatch({
        type: ActionTypes.LOGIN_FAILURE,
        payload: { error: error.message },
      });
      throw error;
    }
  };

  // Register function
  const register = async (userData) => {
    dispatch({ type: ActionTypes.LOGIN_START });

    try {
      const response = await apiService.register(userData);
      
      // If registration includes auto-login
      if (response.token) {
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.token);
        if (response.refreshToken) {
          localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.refreshToken);
        }

        dispatch({
          type: ActionTypes.LOGIN_SUCCESS,
          payload: {
            user: response.user,
            token: response.token,
          },
        });
      } else {
        dispatch({ type: ActionTypes.SET_LOADING, payload: { isLoading: false } });
      }

      return response;
    } catch (error) {
      dispatch({
        type: ActionTypes.LOGIN_FAILURE,
        payload: { error: error.message },
      });
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await apiService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
      
      dispatch({ type: ActionTypes.LOGOUT });
    }
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      const updatedUser = await apiService.updateUserProfile(userData);
      dispatch({
        type: ActionTypes.SET_USER,
        payload: { user: updatedUser },
      });
      return updatedUser;
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: ActionTypes.CLEAR_ERROR });
  };

  // Refresh token
  const refreshToken = async () => {
    try {
      const response = await apiService.refreshToken();
      
      dispatch({
        type: ActionTypes.LOGIN_SUCCESS,
        payload: {
          user: state.user,
          token: response.token,
        },
      });

      return response;
    } catch (error) {
      console.error('Token refresh error:', error);
      logout();
      throw error;
    }
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    updateProfile,
    clearError,
    refreshToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export default AuthContext;