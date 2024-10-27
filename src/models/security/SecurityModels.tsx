export interface User {
    id: number;
    username: string;
    name: string;
    role?: Role;
  }

  export interface Role {
    id: number;
    name: string;
    permissions?: GrantedPermission[];
  }
  
  export interface Operation {
    id: number;
    name: string;
    path: string;
    httpMethod: string;
    permitAll: boolean;
    module?: Module;
  }
  
  export interface Module {
    id: number;
    name: string;
    basePath: string;
  }
  
  export interface GrantedPermission {
    id: number;
    role?: Role;
    operation?: Operation;
  }
  
  export interface JwtToken {
    id: number;
    token: string;
    expiration: Date;
    isValid: boolean;
    user?: User;
  }
  
  // DTO Types
  export interface AuthenticationRequest {
    username: string;
    password: string;
  }
  
  export interface AuthenticationResponse {
    jwt: string;
  }
  
  export interface LogoutResponse {
    message: string;
  }
  
  export interface ApiError {
    backendMessage: string;
    message: string;
    url: string;
    method: string;
    timestamp: string;
  }
  
  export interface RegisterUser {
    id: number;
    username: string;
    name: string;
    role: string;
    jwt: string;
  }
  
  export interface UserDto {
    name: string;
    username: string;
    password: string;
    repeatedPassword: string;
  }