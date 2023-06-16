import {NavigationProp, RouteProp} from '@react-navigation/native';
import {useContext, useEffect} from 'react';
import {AuthContext} from '../contextWrappers/AuthContext/context';
import LoadingScreen from './LoadingScreen';
import {login} from '../components/LoginForm/api';

export default function AutoLoginScreen(props: {
  navigation: NavigationProp<any, any>;
  route: RouteProp<
    {params: {saleId: string; email: string; password: string}},
    'params'
  >;
}) {
  const authContext = useContext(AuthContext);
  const {navigation, route} = props;
  const {saleId, password, email} = route.params;

  const handleLogin = async () => {
    const result = await login(email, password, saleId);
    if (result.isOk()) {
      console.log('result.value.jwt', result.value.jwt);
      await authContext.login(result.value.jwt);
      return navigation.reset({
        index: 0,
        routes: [{name: 'SignedInTabNavigator'}],
      });
    }
    return navigation.reset({
      index: 0,
      routes: [{name: 'LoginScreen', params: {saleId}}],
    });
  };

  useEffect(() => {
    handleLogin();
  }, []);

  return <LoadingScreen />;
}
