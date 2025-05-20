// types/AuthFormTypes.ts

export type UserRole = 'student' | 'admin' | 'mentor';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginProps {
  role: UserRole;
  onSubmit: (credentials: LoginCredentials) => void;
  showRegisterToggle?: boolean;
  imageUrl?: string;
  title?: string;
}
