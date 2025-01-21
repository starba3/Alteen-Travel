export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
  createdAt: string;
  avatar?: string;
  visaPrice: number;
}

export interface FirestoreUserData {
  name: string;
  image: string;
  email: string;
  isAdmin: boolean;
}

export interface UserWithPassword extends User {
  password: string;
}

export type UserResponse = Omit<User, "password">;