import styled from 'styled-components/native';
import {colors} from '../styles';
import Logo from '../../assets/images/logo.svg';
import {ActivityIndicator} from 'react-native';
import {FetchError} from '../api';
import ErrorMessage from '../components/ErrorMessage/component';

export default function LoadingScreen(props: {error?: FetchError}) {
  const {error} = props;

  return (
    <Screen>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <ActivityIndicator color={colors.secondary}></ActivityIndicator>
      <ErrorMessage error={error}></ErrorMessage>
    </Screen>
  );
}
const Screen = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.black};
  align-items: center;
  justify-content: center;
  padding-bottom: 15%;
`;

const LogoContainer = styled.View`
  width: 60%;
  height: 20%;
`;
