import {NavigationProp, RouteProp} from '@react-navigation/native';
import styled from 'styled-components/native';
import {borderRadius, colors, fonts} from '../styles';
import Logo from '../../assets/images/logo.svg';
import PrimaryTextInput from '../components/PrimaryTextInput/component';
import PrimaryButton from '../components/PrimaryButton/component';
import {useContext, useState} from 'react';
import {LoginForm} from '../components/LoginForm/component';
import {AuthContext} from '../contextWrappers/AuthContext/context';
import PrimaryText from '../components/PrimaryText/component';

export default function LoginScreen(props: {
  navigation: NavigationProp<any, any>;
  route: RouteProp<{params: {saleId: string}}, 'params'>;
}) {
  const authContext = useContext(AuthContext);
  const {navigation, route} = props;
  const {saleId} = route.params;

  return (
    <HomeScreenContainer>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <LoginText>Prihláste sa</LoginText>
      <LoginForm onLogin={authContext.login} saleId={saleId} />
    </HomeScreenContainer>
  );
}
const HomeScreenContainer = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.black};
  align-items: center;
  justify-content: center;
  padding-bottom: 15%;
`;

const LoginText = styled(PrimaryText)`
  font-size: 20px;
  color: ${colors.white};
  font-family: ${fonts.regular};
  margin-bottom: 10px;
`;

const LogoContainer = styled.View`
  width: 60%;
  height: 20%;
`;
