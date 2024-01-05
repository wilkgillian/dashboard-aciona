import { apiAuth } from '@/services/api';
import { useRouter } from 'next/router';
import { ReactNode, createContext, useState } from 'react';
import { toast } from 'react-toastify';

interface AuthContextDataProps {
  login: (data: SignInProps) => Promise<void>;
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

  async function login(data: SignInProps) {
    const response = await apiAuth.post('login', data);
    localStorage.setItem('token', response.data.token);
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
