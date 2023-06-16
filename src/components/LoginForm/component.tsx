import styled from 'styled-components/native';
import {borderRadius, colors} from '../../styles';
import PrimaryButton from '../PrimaryButton/component';
import PrimaryTextInput from '../PrimaryTextInput/component';
import {useState} from 'react';
import {isEmailValid} from './services';
import {login} from './api';
import {
  OtherError,
  FetchError as RecognizedError,
  isNoInternetError,
} from '../../api';
import ErrorMessage from '../ErrorMessage/component';

export function LoginForm(props: {
  onLogin: (token: string) => void;
  saleId: string;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<RecognizedError | undefined>(undefined);

  const handleLogin = async () => {
    if (!isEmailValid(email)) {
      setError(new OtherError('Invalid email'));
      return;
    }

    const result = await login(email, password, props.saleId);

    if (result.isOk()) {
      props.onLogin(result.value.jwt);
    } else {
      setError(result.err);
    }
  };

  return (
    <LoginFormContainer>
      <PrimaryTextInput
        placeholder="Váš email"
        autoComplete="email"
        label="Email"
        autoFocus
        value={email}
        onChange={e => {
          setEmail(e.nativeEvent.text);
        }}
      />
      <PrimaryTextInput
        placeholder="Heslo od organizátora"
        autoComplete="password"
        label="Heslo"
        secureTextEntry
        value={password}
        onChange={e => {
          setPassword(e.nativeEvent.text);
        }}
      />
      <PrimaryButton text="Prihlásiť sa" onPress={handleLogin} />
      <ErrorMessage
        error={error}
        resolveApiError={() => {
          return 'Wrong email or password';
        }}
      />
    </LoginFormContainer>
  );
}

const LoginFormContainer = styled.View`
  width: 80%;
  background-color: ${colors.darkGrey};
  border-radius: ${borderRadius.medium};
  padding: 20px;
  padding-bottom: 0;
`;
