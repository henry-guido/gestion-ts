import { create } from 'zustand';
import { type GraphConfig, type UserAccountInfo } from '../types/msal';
import { loginRequest } from '../authConfig';
import { callMsGraph, getPicture } from '@/graph';
import { type IPublicClientApplication, type AccountInfo } from '@azure/msal-browser';
import { persist, createJSONStorage } from 'zustand/middleware'

interface State {
  accountInfo: UserAccountInfo
  loading: boolean
  changeLoading: () => void
  getAccountInfo: (instance: IPublicClientApplication, accounts: AccountInfo[]) => Promise<void>
}

export const useInfoAccountStore = create<State>()(persist((set, get) => {
  return {
    accountInfo: { name: '', email: '', picture: '' },
    loading: false,
    changeLoading: () => { set((state) => ({ loading: !state.loading })) },
    getAccountInfo: async (instance, accounts) => {
      try {
        const tokenResponse = await instance.acquireTokenSilent({
          ...loginRequest,
          account: accounts[0],
        });

        const graphResponse: GraphConfig = await callMsGraph(tokenResponse.accessToken);
        const name = graphResponse.displayName
        const email = graphResponse.mail ?? graphResponse.userPrincipalName

        const picture = await getPicture(tokenResponse.accessToken) ?? '';

        set((state) => ({ accountInfo: { ...state.accountInfo, picture, name, email } }));
      } catch (error) {
        console.error('Error al solicitar datos del perfil:', error);
      }
    },
  }
}, {
  name: 'infoAccount',
  storage: createJSONStorage(() => sessionStorage)
}));
