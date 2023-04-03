import {Button, Text, View} from 'react-native';
import React, {useState} from 'react';
import styled from 'styled-components/native';
import {requestCameraPermission, requestPermission} from '../permissions';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <StyledView>
      <Text>Current count is {count}</Text>
      <Button title="Increment" onPress={() => setCount(count + 1)} />
      <Text>Click this to require camera permission</Text>
      <Button
        title="Request"
        onPress={async () => {
          await requestCameraPermission().catch(e => {
            console.log('Error requesting permission', e);
          });
        }}></Button>
    </StyledView>
  );
}

const StyledView = styled.View``;
