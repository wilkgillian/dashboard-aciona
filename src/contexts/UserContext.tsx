import { ReactNode, createContext, useEffect, useState } from 'react';

interface UserContextDataProps {
  loadUser: () => Promise<void>;
  user: User | null;
}

export interface User {
  login: string;
  id_usuario: number;
  id_perfil: number;
  perfil: string;
  credor_crm: Array<number>;
  nome: string;
  email: string;
  cpf_cnpj: string;
  modulo: {
    id_modulo: number;
    modulo: string;
  };
  id_usuario_gestor: number;
  id_loja: number;
  id_regional: number;
}

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContext = createContext({} as UserContextDataProps);

export function UserProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);

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

  async function loadUser() {
    const token = localStorage.getItem('token');
    const decodedToken = parseJwt(token!);
    setUser(decodedToken);
  }
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        loadUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
