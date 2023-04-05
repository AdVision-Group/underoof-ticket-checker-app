import {useState} from 'react';
import {TextInputProps} from 'react-native';
import styled from 'styled-components/native';
import {borderRadius, colors, fonts} from '../../styles';

export default function PrimaryTextInput(
  props: TextInputProps & {
    placeholder: string;
    placeholderTextColor?: string;
    label?: string;
  },
) {
  const [focused, setFocused] = useState(false);
  const {label, ...baseProps} = props;

  return (
    <InputContainer>
      {label && <InputLabel>{label}</InputLabel>}
      <StyledTextInput
        {...baseProps}
        selectionColor={props.selectionColor ?? colors.secondary}
        style={{
          borderColor: focused ? `${colors.secondary}` : 'black',
          borderWidth: focused ? 1 : 0,
        }}
        onFocus={e => {
          props.onFocus && props.onFocus(e);
          setFocused(true);
        }}
        onBlur={e => {
          props.onBlur && props.onBlur(e);
          setFocused(false);
        }}
      />
    </InputContainer>
  );
}

const StyledTextInput = styled.TextInput.attrs({
  placeholderTextColor: colors.lightGrey,
})`
  background-color: ${colors.mediumGrey};
  color: ${colors.white};
  width: 100%;
  border-radius: ${borderRadius.medium};
  padding: 10px;
`;

const InputLabel = styled.Text`
  font-size: 10px;
  color: ${colors.white};
  font-family: ${fonts.regular};
  margin-bottom: 10px;
`;

const InputContainer = styled.View`
  width: 100%;
  margin-bottom: 20px;
`;
