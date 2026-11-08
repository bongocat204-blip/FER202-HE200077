import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUsers, createUser, getUserById } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize user from localStorage on initial load
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = localStorage.getItem('bonggo_user');
        if (storedUser) {
          const parsed = JSON.parse(storedUser);
          // Optional: re-verify with backend to ensure user status hasn't changed to Inactive
          try {
            const freshUser = await getUserById(parsed.id);
            if (freshUser && freshUser.status === 'Active') {
              setUser(freshUser);
              localStorage.setItem('bonggo_user', JSON.stringify(freshUser));
            } else if (freshUser && freshUser.status === 'Inactive') {
              localStorage.removeItem('bonggo_user');
              setUser(null);
            } else {
              setUser(parsed);
            }
          } catch {
            // If backend is temporarily unreachable, fallback to localStorage user
            setUser(parsed);
          }
        }
      } catch (e) {
        console.error('Failed to parse stored user:', e);
        localStorage.removeItem('bonggo_user');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login handler
  const login = async (identifier, password) => {
    try {
      const users = await getUsers();
      const normalizedIdentifier = (identifier || '').trim().toLowerCase();

      const foundUser = users.find(
        (u) =>
          (u.username.toLowerCase() === normalizedIdentifier ||
            u.email.toLowerCase() === normalizedIdentifier) &&
          u.password === password
      );

      if (!foundUser) {
        throw new Error('Tài khoản hoặc mật khẩu không chính xác!');
      }

      // Check if user is locked
      if (foundUser.status === 'Inactive') {
        throw new Error('Tài khoản của bạn đã bị khóa.');
      }

      setUser(foundUser);
      localStorage.setItem('bonggo_user', JSON.stringify(foundUser));
      return foundUser;
    } catch (error) {
      throw error;
    }
  };

  // Register handler
  const register = async ({ username, email, password, fullName }) => {
    try {
      const users = await getUsers();
      const cleanUsername = (username || '').trim();
      const cleanEmail = (email || '').trim().toLowerCase();

      // Check duplication
      const existingUser = users.find(
        (u) =>
          u.username.toLowerCase() === cleanUsername.toLowerCase() ||
          u.email.toLowerCase() === cleanEmail
      );

      if (existingUser) {
        if (existingUser.username.toLowerCase() === cleanUsername.toLowerCase()) {
          throw new Error('Tên đăng nhập đã được sử dụng!');
        }
        if (existingUser.email.toLowerCase() === cleanEmail) {
          throw new Error('Email đã được đăng ký tài khoản!');
        }
      }

      const newUser = {
        id: `usr_${Date.now()}`,
        username: cleanUsername,
        email: cleanEmail,
        password: password,
        fullName: (fullName || '').trim() || cleanUsername,
        role: 'User',
        status: 'Active'
      };

      const created = await createUser(newUser);

      // Auto login newly registered user
      setUser(created);
      localStorage.setItem('bonggo_user', JSON.stringify(created));
      return created;
    } catch (error) {
      throw error;
    }
  };

  // Logout handler
  const logout = () => {
    setUser(null);
    localStorage.removeItem('bonggo_user');
  };

  // Refresh user data from server (e.g. after profile changes)
  const refreshUser = async () => {
    if (!user?.id) return;
    try {
      const fresh = await getUserById(user.id);
      if (fresh) {
        if (fresh.status === 'Inactive') {
          logout();
          alert('Tài khoản của bạn đã bị khóa bởi Quản trị viên.');
        } else {
          setUser(fresh);
          localStorage.setItem('bonggo_user', JSON.stringify(fresh));
        }
      }
    } catch (e) {
      console.error('Failed to refresh user:', e);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'Admin',
    loading,
    login,
    register,
    logout,
    refreshUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
