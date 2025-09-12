// Type definitions for Select Component App

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface FormData {
  country: string;
  skillLevel: string;
  category: string;
  timezone: string;
  status: string;
}

export interface SelectDemoProps {
  title: string;
  description: string;
  value: string;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  onValueChange: (value: string) => void;
}

export interface ValidationErrors {
  [key: string]: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
  errors?: ValidationErrors;
}

export type SelectVariant = 'default' | 'error' | 'success' | 'disabled';