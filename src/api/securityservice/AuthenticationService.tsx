import { 
  AuthenticationRequest, 
  AuthenticationResponse, 
  LogoutResponse, 
  User, 
  RegisterUser, 
  UserDto,
  PasswordChangeRequest
} from '../../models/security/SecurityModels';
import { api, encryptToken } from './ApiConfig';
import { validatePassword } from './PasswordUtils';

export class AuthService {
  private static instance: AuthService;
  private readonly AUTH_PATH = '/auth';
  private readonly CUSTOMERS_PATH = '/customers';
  private readonly PASSWORD_EXPIRES_DAYS = 90;

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

      // Check token expiration
      const tokenData = JSON.parse(atob(jwt.split('.')[1]));
      const expirationDate = new Date(tokenData.exp * 1000);
      
      if (expirationDate < new Date()) {
        return false;
      }

      return response.data;
    } catch {
      return false;
    }
  }

  async login(credentials: AuthenticationRequest): Promise<AuthenticationResponse> {
    // Validate password before sending to server
    const passwordValidation = validatePassword(credentials.password);
    if (!passwordValidation.isValid) {
      throw new Error(passwordValidation.errors.join('\n'));
    }

    const response = await api.post<AuthenticationResponse>(
      `${this.AUTH_PATH}/authenticate`,
      credentials
    );
    
    if (response.data.jwt) {
      const encryptedToken = encryptToken(response.data.jwt);
      localStorage.setItem('jwt', encryptedToken);
      localStorage.setItem('passwordLastChanged', new Date().toISOString());
    }
    
    return response.data;
  }

  async logout(): Promise<LogoutResponse> {
    const response = await api.post<LogoutResponse>(`${this.AUTH_PATH}/logout`);
    this.clearAuthData();
    return response.data;
  }

  async getProfile(): Promise<User> {
    const response = await api.get<User>(`${this.AUTH_PATH}/profile`);
    return response.data;
  }

  async registerCustomer(userData: UserDto): Promise<RegisterUser> {
    const passwordValidation = validatePassword(userData.password);
    if (!passwordValidation.isValid) {
      throw new Error(passwordValidation.errors.join('\n'));
    }

    const response = await api.post<RegisterUser>(
      this.CUSTOMERS_PATH,
      userData
    );
    return response.data;
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    const passwordValidation = validatePassword(newPassword);
    if (!passwordValidation.isValid) {
      throw new Error(passwordValidation.errors.join('\n'));
    }

    await api.post(`${this.AUTH_PATH}/change-password`, {
      currentPassword,
      newPassword
    } as PasswordChangeRequest);

    localStorage.setItem('passwordLastChanged', new Date().toISOString());
  }

  async checkPasswordExpiration(): Promise<boolean> {
    const lastChanged = localStorage.getItem('passwordLastChanged');
    if (!lastChanged) return true;

    const daysSinceChange = (new Date().getTime() - new Date(lastChanged).getTime()) / (1000 * 60 * 60 * 24);
    return daysSinceChange >= this.PASSWORD_EXPIRES_DAYS;
  }

  private clearAuthData(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('passwordLastChanged');
  }
}

export const authService = AuthService.getInstance();