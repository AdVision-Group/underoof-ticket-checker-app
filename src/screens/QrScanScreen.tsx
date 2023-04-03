import {useEffect, useState} from 'react';
import {BarCodeReadEvent, RNCamera} from 'react-native-camera';
import {requestCameraPermission} from '../permissions';
import {Alert, Text} from 'react-native';
import styled from 'styled-components/native';
import {decode} from 'base-64';

type UnderoofQrScanResult = {
  saleUuid: string;
  ticketCode: string;
};

function decodeBase64(base64: string): string | null {
  try {
    return decode(base64);
  } catch (e) {
    console.log('Error decoding base64', e);
    return null;
  }
}

function isValidUuid(uuid: string): boolean {
  const uuidRegex = new RegExp(
    '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$',
  );
  return uuidRegex.test(uuid);
}

function getUnderoofScanResult(data: string): UnderoofQrScanResult | null {
  try {
    const parsed = data.split(':');
    if (parsed.length !== 2) {
      return null;
    }

    const [saleUuid, ticketCode] = parsed;
    if (
      isValidUuid(saleUuid) &&
      typeof ticketCode === 'string' &&
      typeof saleUuid === 'string'
    ) {
      return {
        saleUuid,
        ticketCode,
      };
    }
    return null;
  } catch (e) {
    return null;
  }
}

export default function QrScanScreen() {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const status = await requestCameraPermission();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = (event: BarCodeReadEvent) => {
    const {type, data} = event;
    console.log('Scanned: ', type, data);
    const underoofScanResult = getUnderoofScanResult(data);
    if (underoofScanResult) {
      setScanned(true);
      Alert.alert(`Underoof code: ${underoofScanResult.ticketCode}`);
    }
  };

  return (
    <Screen>
      {hasPermission ? (
        <RNCamera
          captureAudio={false}
          ref={ref => {
            // @ts-ignore
            this.camera = ref;
          }}
          onBarCodeRead={scanned ? undefined : handleBarCodeScanned}
          style={{
            flex: 1,
            width: '100%',
          }}></RNCamera>
      ) : (
        <Text>No access to camera</Text>
      )}
    </Screen>
  );
}

const Screen = styled.SafeAreaView`
  width: 100%;
  height: 100%;
  background-color: #fff;
  justify-content: center;
  align-items: center;
`;
