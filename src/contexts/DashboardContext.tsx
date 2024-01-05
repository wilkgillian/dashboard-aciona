import { apiDashboard } from '@/services/api';
import { ReactNode, createContext, useEffect, useState } from 'react';
import { User } from './UserContext';

interface DashboardContextDataProps {
  loadDashboard: (
    user: User,
    tipo: string,
    id?: number,
    data?: string
  ) => Promise<any>;
  setDashboard: (dashboard: Dashboard) => void;
  dashboard: Dashboard | null;
}

interface Producao {
  acionados: number;
  percAcionados: number;
  acordos: number;
  percAcordos: number;
  horaProcessamento: string;
  insucesso: number;
  percInsucesso: number;
  naoAcionados: number;
  percNaoAcionados: number;
  quantidadeAcordos: number;
  quantidadeFila: number;
  quantidadePagamentosLoja: number;
  quantidadePix: number;
  quantidadeVendAcionamentos: number;
  percVendComAcionamentos: number;
  quantidadeVendedores: number;
  recado: number;
  percRecado: number;
  total: number;
  valorAV: number;
  valorAVencer: number;
  valorEntrada: number;
  valorTotal: number;
  valorVencido: number;
}

interface Pagamentos {
  efetividade: number;
  meta: number;
  quantidadePagamentos: number | null;
  valorPagamentos: number;
}

interface TipoPagamento {
  idTipoPagamento: number;
  pagamento: string;
  quantidade: number;
}

export interface RankingArrecadacaoItem {
  idVendedor?: number;
  idRegional?: number;
  idLoja?: number;
  loja?: string;
  regional?: string;
  vendedor?: string;
  valorPagamentos?: number;
  vlrPagamentos?: number;
  efetividade: number;
}

interface Data {
  data: string;
  gerente: string;
  idLoja: number;
  loja: string;
  idRegional: number;
  regional: string;
  percentualAcesso: number;
  rankingArrecGeral: number | null;
  rankingArrecRegional: number;
  rankingEfetGeral: number;
  rankingEfetRegional: number;
  producao: Producao;
  pagamentos: Pagamentos;
  rankingArrecadacao: RankingArrecadacaoItem[];
  tipoPagamento: TipoPagamento[];
}

export interface Dashboard {
  statusCode: number;
  data: Data;
}

interface DashboardContextProviderProps {
  children: ReactNode;
}

export const DashboardContext = createContext({} as DashboardContextDataProps);

export function DashboardProvider({ children }: DashboardContextProviderProps) {
  let endpoint: string = '';
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);

  async function loadDashboard(
    user: User,
    tipo: string,
    id?: number,
    data?: string
  ) {
    const token = localStorage.getItem('token');
    switch (user.perfil) {
      case 'Gerente Loja':
        endpoint = `cobranca/loja/${id}`;
        break;
      case 'Gerente Regional':
        endpoint = `cobranca/regional/${id}`;
        break;
      case 'Gerente Matriz':
        endpoint = 'cobranca/matriz';
        break;
      default:
        endpoint = `cobranca/loja/${id}`;
    }
    const response = await apiDashboard.get(endpoint, {
      params: {
        tipo: tipo,
        data: data ? data : undefined
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }

  return (
    <DashboardContext.Provider
      value={{
        dashboard,
        setDashboard,
        loadDashboard
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
