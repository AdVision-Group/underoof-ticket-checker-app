import {
  ButtonProps,
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
} from 'react-native';
import styled from 'styled-components/native';
import {borderRadius, colors} from '../../styles';

export default function PrimaryButton(
  props: TouchableOpacityProps & {
    text: string;
  },
) {
  const {text, ...baseProps} = props;

  return (
    <Button {...baseProps}>
      <ButtonText>{props.text}</ButtonText>
    </Button>
  );
}

const Button = styled.TouchableOpacity`
  background-color: ${colors.secondary};
  border-radius: ${borderRadius.medium};
  padding: 10px;
  margin-bottom: 20px;
  width: 100%;
  color: ${colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.Text`
  color: ${colors.black};
`;
