import { LoginCredentials, LoginResponse } from "@/types/authResponse";
import http from "./baseRequest";   

interface ApiErrorResponse {
  message: string;
  status: number;
  data: unknown;
}

export const loginService = {
    async login(credentials: LoginCredentials): Promise<LoginResponse> {
        try {
          const response = await http.post<LoginResponse>(`/auth/login`, credentials);
          return response.data;
        } catch (error) {
          const apiError = error as ApiErrorResponse;
          
          // Provide more user-friendly error messages
          let userMessage = apiError.message;
          if (apiError.message === "Invalid credentials") {
            userMessage = "El correo electrónico o la contraseña son incorrectos";
          }
          
          throw {
            success: false,
            message: userMessage,
            data: null
          };
        }
      }
};
