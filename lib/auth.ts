import { initialUsers } from "./data/users";
import type { User, UserWithPassword } from "./types/user";

const AUTH_TOKEN_KEY = "auth_token";
const USER_DATA_KEY = "user_data";

export async function authenticateUser(email: string, password: string): Promise<User> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Find user by email
  const user = initialUsers.find(u => u.email === email);
  
  // Validate credentials
  if (!user || user.password !== password) {
    throw new Error("Invalid credentials");
  }

  // Generate mock token
  const token = `token_${Math.random().toString(36).substr(2)}`;
  
  // Get user data without password
  const { password: _, ...userData } = user;

  // Store authentication data
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));

  return userData;
}

export function getStoredAuth() {
  if (typeof window === 'undefined') return { user: null, token: null, isAdmin: false };
  
  try {
    const userStr = localStorage.getItem('authUser');
    const token = localStorage.getItem('authToken');
    const user = userStr ? JSON.parse(userStr) : null;
    
    // Also store admin status in localStorage
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    
    return {
      user,
      token,
      isAdmin
    };
  } catch (error) {
    console.error('Error reading auth data:', error);
    return { user: null, token: null, isAdmin: false };
  }
}

export function clearStoredAuth(): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.removeItem('authUser');
    localStorage.removeItem('authToken');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('userData');
  } catch (error) {
    console.error("Error clearing auth data:", error);
  }
}