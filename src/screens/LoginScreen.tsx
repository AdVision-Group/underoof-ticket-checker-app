import {NavigationProp} from '@react-navigation/native';
import SaleSelectDropdown from '../components/SaleSelectDropdown/component';
import styled from 'styled-components/native';
import {borderRadius, colors, fonts} from '../styles';
import Logo from '../../assets/images/logo.svg';
import {useState} from 'react';
import PrimaryTextInput from '../components/PrimaryTextInput/component';
import PrimaryButton from '../components/PrimaryButton/component';

export default function LoginScreen(props: {
  navigation: NavigationProp<any, any>;
}) {
  const {navigation} = props;
  return (
    <HomeScreenContainer>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <LoginText>Prihláste sa</LoginText>
      <LoginForm>
        <PrimaryTextInput
          placeholder="Váš email"
          autoComplete="email"
          label="Email"
          autoFocus
        />
        <PrimaryTextInput
          placeholder="Heslo od organizátora"
          autoComplete="password"
          label="Heslo"
        />
        <PrimaryButton text="Prihlásiť sa" />
      </LoginForm>
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

const LoginText = styled.Text`
  font-size: 20px;
  color: ${colors.white};
  font-family: ${fonts.regular};
  margin-bottom: 10px;
`;

const LogoContainer = styled.View`
  width: 60%;
  height: 20%;
`;

const LoginForm = styled.View`
  width: 80%;
  background-color: ${colors.darkGrey};
  border-radius: ${borderRadius.medium};
  padding: 20px;
  padding-bottom: 0;
`;
