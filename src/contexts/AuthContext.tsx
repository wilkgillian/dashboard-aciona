import { apiAuth } from '@/services/api';
import { useRouter } from 'next/router';
import { ReactNode, createContext, useState } from 'react';
import { toast } from 'react-toastify';
import { User } from './UserContext';

interface AuthContextDataProps {
  login: (data: SignInProps) => Promise<User>;
  logout: () => void;
  email: string;
  requestReset: (email: string) => Promise<void>;
  verifyCode: (data: VerifyCodeProps) => Promise<void>;
  resetPassword: (data: ResetPasswordProps) => Promise<void>;
}

export interface SignInProps {
  login: string;
  password: string;
  modulo: number;
}
export interface VerifyCodeProps {
  email: string;
  code: string;
}
export interface ResetPasswordProps {
  email: string;
  password: string;
}
interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthProvider({ children }: AuthContextProviderProps) {
  const router = useRouter();
  const [email, setEmail] = useState('');

  function logout() {
    localStorage.clear();
    router.push('/');
  }

  function parseJwt(token: string) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );

      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Erro ao decodificar o token JWT:', error);
      return null;
    }
  }

  async function login(data: SignInProps) {
    const response = await apiAuth.post('login', data);
    localStorage.setItem('token', response.data.token);
    const user: User = parseJwt(response.data.token);
    return user;
  }

  async function requestReset(email: string) {
    setEmail(email);
    const data = {
      email
    };
    const response = await apiAuth.post('request-reset', data);
    if (response.status === 200) {
      router.push('/recovery-code');
    } else {
      toast.error('Falha ao tentar enviar o código');
    }
  }
  async function verifyCode(data: VerifyCodeProps) {
    const response = await apiAuth.put('verify-code', data);
    if (response.status === 200) {
      router.push('/define-new-password');
    } else {
      toast.error('Código inválido');
    }
  }
  async function resetPassword(data: ResetPasswordProps) {
    const response = await apiAuth.put('reset-password', data);
    if (response.status === 200) {
      router.push('/');
    } else {
      toast.error('Falha ao redefinir senha');
    }
  }

  return (
    <AuthContext.Provider
      value={{
        email,
        logout,
        login,
        requestReset,
        verifyCode,
        resetPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
