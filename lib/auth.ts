// import { initialUsers } from "./data/users";
import type { User, UserWithPassword } from "./types/user";
import Cookies from 'js-cookie';

const AUTH_TOKEN_KEY = "auth_token";
const USER_DATA_KEY = "user_data";

export function getStoredAuth() {
  if (typeof window === 'undefined') return { user: null, token: null, isAdmin: false };
  
  try {
    const userStr = Cookies.get('authUser');
    const token = Cookies.get('authToken');
    const userData = Cookies.get('userData');
    // const user = userStr ? JSON.parse(userStr) : null;
    
    // Also store admin status in localStorage
    // const isAdmin = localStorage.getItem('isAdmin') === 'true';
    
    return {
      userData,
      token,
      
    };
  } catch (error) {
    console.error('Error reading auth data:', error);
    return { user: null, token: null };
  }
}

export function getVisaPrice(): number {
  if (typeof window === 'undefined') return 0;
  
  try {
    const userDataStr = localStorage.getItem('userData');
    if (!userDataStr) return 0;
    
    const userData = JSON.parse(userDataStr);
    return userData.visaPrice || 0;
  } catch (error) {
    console.error('Error reading visa price from userData:', error);
    return 0;
  }
}


export function clearStoredAuth(): void {
  if (typeof window === "undefined") return;
  
  try {

    localStorage.removeItem('authUser');
    localStorage.removeItem('authToken');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('userData');

    Cookies.remove('isAdmin');
  } catch (error) {
    console.error("Error clearing auth data:", error);
  }
}