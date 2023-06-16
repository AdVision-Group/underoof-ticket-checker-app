import styled from 'styled-components/native';
import {colors} from '../styles';
import PrimaryText from '../components/PrimaryText/component';
import PrimaryButton from '../components/PrimaryButton/component';
import {useContext} from 'react';
import {AuthContext} from '../contextWrappers/AuthContext/context';

export default function SettingsScreen() {
  const authContext = useContext(AuthContext);
  return (
    <Screen>
      <Title>Settings</Title>
      <LogoutButtonContainer>
        <LogoutButton
          text="Logout"
          onPress={() => {
            authContext.logout();
          }}
        />
      </LogoutButtonContainer>
    </Screen>
  );
}

const Screen = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.darkGrey};
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
`;

const Title = styled(PrimaryText)`
  font-size: 20px;
  padding: 20px;
  color: ${colors.white};
`;

const LogoutButtonContainer = styled.View`
  position: absolute;
  bottom: 20px;
  left: 0;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const LogoutButton = styled(PrimaryButton)`
  width: 90%;
`;
