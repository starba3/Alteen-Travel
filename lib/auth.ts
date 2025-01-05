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

export function getStoredAuth(): { user: User | null; token: string | null } {
  if (typeof window === "undefined") {
    return { user: null, token: null };
  }

  try {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const userJson = localStorage.getItem(USER_DATA_KEY);
    
    if (!token || !userJson) {
      return { user: null, token: null };
    }

    const user = JSON.parse(userJson) as User;
    return { user, token };
  } catch (error) {
    console.error("Error reading auth data:", error);
    return { user: null, token: null };
  }
}

export function clearStoredAuth(): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_DATA_KEY);
  } catch (error) {
    console.error("Error clearing auth data:", error);
  }
}