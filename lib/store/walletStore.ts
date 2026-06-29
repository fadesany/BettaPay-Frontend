import { create } from 'zustand';
import { AssetBalance } from '../types';
import { connectFreighter } from '@/lib/stellar/freighter';
import { HORIZON_URL } from '../utils/constants';

type Connector = 'freighter' | 'walletconnect' | null;

interface WalletState {
  address: string | null;
  isConnected: boolean;
  connector: Connector;
  network: 'mainnet' | 'testnet';
  balances: AssetBalance[];
  loading: boolean;
  error: string | null;
  connect: (connector?: Connector) => Promise<void>;
  disconnect: () => void;
  refreshBalances: () => Promise<void>;
}

export const useWalletStore = create<WalletState>((set, get) => ({
  address: null,
  isConnected: false,
  connector: null,
  network: (process.env.NEXT_PUBLIC_STELLAR_NETWORK as 'mainnet' | 'testnet') || 'testnet',
  balances: [],
  loading: false,
  error: null,

  connect: async (connector: Connector = 'freighter') => {
    try {
      if (connector === 'freighter') {
        const address = await connectFreighter();
        if (address) {
          set({ address, isConnected: true, connector: 'freighter' });
          get().refreshBalances();
        } else {
          throw new Error('Freighter connection failed or was cancelled');
        }
      } else if (connector === 'walletconnect') {
        const manual = typeof window !== 'undefined' ? window.prompt('Paste your Stellar public key (WalletConnect placeholder):') : null;
        if (manual) {
          set({ address: manual, isConnected: true, connector: 'walletconnect' });
          get().refreshBalances();
        } else {
          throw new Error('WalletConnect placeholder: no key provided');
        }
      } else {
        throw new Error('Unsupported connector');
      }
    } catch (error) {
      console.error('Failed to connect wallet', error);
      throw error;
    }
  },

  disconnect: () => {
    set({ address: null, isConnected: false, connector: null, balances: [], loading: false, error: null });
  },

  refreshBalances: async () => {
    const { address } = get();
    if (!address) return;

    set({ loading: true, error: null });

    try {
      const response = await fetch(`${HORIZON_URL}/accounts/${address}`);

      if (!response.ok) {
        if (response.status === 404) {
          set({ balances: [], loading: false });
          return;
        }
        throw new Error(`Horizon error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      const balances: AssetBalance[] = data.balances.map((b: { asset_type: string; balance: string; asset_code?: string; asset_issuer?: string }) => {
        if (b.asset_type === 'native') {
          return { assetCode: 'XLM', balance: b.balance };
        }
        return {
          assetCode: b.asset_code!,
          balance: b.balance,
          assetIssuer: b.asset_issuer,
        };
      });

      set({ balances, loading: false, error: null });
    } catch (error) {
      console.error('Failed to refresh balances', error);
      set({
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch balances',
      });
    }
  },
}));
