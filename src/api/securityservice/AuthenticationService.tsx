import { AuthenticationRequest, AuthenticationResponse, LogoutResponse, User, RegisterUser, UserDto
} from '../../models/security/SecurityModels';
import { api } from './ApiConfig';
  
  export class AuthService {
    private static instance: AuthService;
    private readonly AUTH_PATH = '/auth';
    private readonly CUSTOMERS_PATH = '/customers';
  
    private constructor() {}
  
    public static getInstance(): AuthService {
      if (!AuthService.instance) {
        AuthService.instance = new AuthService();
      }
      return AuthService.instance;
    }
  
    async validateToken(jwt: string): Promise<boolean> {
      try {
        const response = await api.get<boolean>(`${this.AUTH_PATH}/validate-token`, {
          params: { jwt }
        });
        return response.data;
      } catch {
        return false;
      }
    }
  
    async login(credentials: AuthenticationRequest): Promise<AuthenticationResponse> {
      const response = await api.post<AuthenticationResponse>(
        `${this.AUTH_PATH}/authenticate`,
        credentials
      );
      
      if (response.data.jwt) {
        localStorage.setItem('jwt', response.data.jwt);
      }
      
      return response.data;
    }
  
    async logout(): Promise<LogoutResponse> {
      const response = await api.post<LogoutResponse>(`${this.AUTH_PATH}/logout`);
      localStorage.removeItem('jwt');
      return response.data;
    }
  
    async getProfile(): Promise<User> {
      const response = await api.get<User>(`${this.AUTH_PATH}/profile`);
      return response.data;
    }
  
    async registerCustomer(userData: UserDto): Promise<RegisterUser> {
      const response = await api.post<RegisterUser>(
        this.CUSTOMERS_PATH,
        userData
      );
      return response.data;
    }
  }
  
  // Create a singleton instance
  export const authService = AuthService.getInstance();