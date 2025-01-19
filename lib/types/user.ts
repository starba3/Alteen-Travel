export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
  createdAt: string;
  avatar?: string;
  visaPrice: number;
}

export interface UserWithPassword extends User {
  password: string;
}

export type UserResponse = Omit<User, "password">;