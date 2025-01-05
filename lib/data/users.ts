import type { UserWithPassword } from "../types/user";

export const initialUsers: UserWithPassword[] = [
  {
    id: "usr_admin",
    email: "admin@example.com",
    password: "Admin123!",
    name: "John Administrator",
    role: "admin",
    createdAt: new Date().toISOString()
  },
  {
    id: "usr_user",
    email: "user@example.com",
    password: "User123!",
    name: "Jane Smith",
    role: "user",
    createdAt: new Date().toISOString()
  }
];

// Function to get user without password
export function getUserWithoutPassword(user: UserWithPassword) {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}