import {TextProps} from 'react-native';
import {colors, fonts} from '../../styles';
import styled from 'styled-components/native';
import {Text} from 'react-native';

export default function PrimaryText(
  props: TextProps & {
    weight?: 'regular' | 'bold';
  },
) {
  const {weight = 'regular', ...otherProps} = props;

  return (
    <Text {...otherProps} style={[{fontFamily: fonts[weight]}, props.style]} />
  );
}
