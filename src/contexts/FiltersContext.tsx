import { apiDashboard } from '@/services/api';
import { ReactNode, createContext, useState } from 'react';

interface FiltersContextDataProps {
  tipo: string;
  setTipo: (tipo: string) => void;
  regional: string | undefined;
  setRegional: (regional: string) => void;
  loja: string | undefined;
  setLoja: (loja: string) => void;
  salesman: string | undefined;
  setSalesman: (salesman: string) => void;
  data: string | undefined;
  setData: (data: string) => void;
  lojas: Lojas[];
  loadLojas: (id_regional: number) => Promise<void>;
  regionais: Regionais[];
  loadRegionais: () => Promise<void>;
  vendedores: Vendedores[];
  loadVendedores: (id_loja: number) => Promise<void>;
}

interface Regionais {
  idRegional: number;
  nomeRegional: string;
}
interface Lojas {
  idLoja: number;
  nomeLoja: string;
}
interface Vendedores {
  idUsuario: number;
  nomeUsuario: string;
}

interface FiltersContextProviderProps {
  children: ReactNode;
}

export const FiltersContext = createContext({} as FiltersContextDataProps);

export function FiltersProvider({ children }: FiltersContextProviderProps) {
  const [lojas, setLojas] = useState<Lojas[]>([]);
  const [regionais, setRegionais] = useState<Regionais[]>([]);
  const [vendedores, setVendedores] = useState<Vendedores[]>([]);
  const [tipo, setTipo] = useState('mes');
  const [regional, setRegional] = useState<string | undefined>(undefined);
  const [loja, setLoja] = useState<string | undefined>(undefined);
  const [salesman, setSalesman] = useState<string | undefined>(undefined);
  const [data, setData] = useState<string | undefined>(undefined);

  async function loadRegionais() {
    const token = localStorage.getItem('token');
    const { data } = await apiDashboard.get('/regional', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setRegionais(data.data);
  }
  async function loadLojas(id_regional: number) {
    const token = localStorage.getItem('token');
    const { data } = await apiDashboard.get(`/loja/${id_regional}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setLojas(data.data);
  }
  async function loadVendedores(id_loja: number) {
    const token = localStorage.getItem('token');
    const { data } = await apiDashboard.get(`/vendedor/${id_loja}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setVendedores(data.data);
  }

  return (
    <FiltersContext.Provider
      value={{
        tipo,
        setTipo,
        regional,
        regionais,
        loadRegionais,
        setRegional,
        loja,
        lojas,
        loadLojas,
        setLoja,
        salesman,
        vendedores,
        loadVendedores,
        setSalesman,
        data,
        setData
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
}
