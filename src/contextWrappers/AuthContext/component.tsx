import {useMemo, useReducer} from 'react';
import {AuthContext} from './context';
import {getStorage, setStorage} from '../../storage';

export default function AuthContextWrapper(props: {children: React.ReactNode}) {
  const [authState, authDispatch] = useReducer(
    (
      _prevState: any,
      action: {
        type: 'login' | 'logout' | 'restoreToken';
        token: string | null;
      },
    ) => {
      switch (action.type) {
        case 'login':
          return {
            token: action.token,
            loading: false,
          };
        case 'logout':
          return {
            token: null,
            loading: false,
          };
        case 'restoreToken':
          return {
            token: action.token,
            loading: false,
          };
      }
    },
    {
      token: null,
      loading: true,
    },
  );

  const authContext = useMemo(
    () => ({
      token: authState.token,
      loading: authState.loading,
      login: async (token: string) => {
        await setStorage('token', token);
        authDispatch({type: 'login', token});
      },
      logout: () => {
        authDispatch({type: 'logout', token: null});
      },
      restoreToken: async () => {
        let token: string | null = null;
        try {
          token = await getStorage('token');
        } catch (e) {
          console.error(e);
        }
        authDispatch({type: 'restoreToken', token});
        return token !== null;
      },
    }),
    [authState],
  );

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
}
