import {createContext} from 'react';

export const AuthContext = createContext<{
  token: string | null;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
  restoreToken: () => Promise<boolean>;
}>({
  token: null,
  loading: true,
  login: async () => {},
  logout: () => {},
  restoreToken: async () => true,
});
