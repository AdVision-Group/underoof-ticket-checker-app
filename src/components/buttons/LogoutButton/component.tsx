import styled from 'styled-components/native';
import {TouchableOpacityProps} from 'react-native';
import LogoutIcon from '../../../../assets/images/logout.svg';

export default function LogoutButton(props: TouchableOpacityProps) {
  return (
    <Button {...props}>
      <LogoutIcon />
    </Button>
  );
}

const Button = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin: 10px;
`;
