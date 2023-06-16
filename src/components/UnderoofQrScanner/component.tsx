import {useContext, useEffect, useState} from 'react';
import {BarCodeReadEvent, RNCamera} from 'react-native-camera';
import styled from 'styled-components/native';
import {requestCameraPermission} from '../../permissions';
import {UnderoofQrScanResult, parseScanResult as parseCode} from './services';
import {colors} from '../../styles';
import {OtherError} from '../../api';
import {CheckTicketResult, TicketCheckResponse, checkTicket} from './api';
import {AuthContext} from '../../contextWrappers/AuthContext/context';
import {Result} from '@flagg2/result';

type OnScanFunction = (result: CheckTicketResult) => void;

export default function UnderoofQrScanner(props: {
  onNewScanResult: OnScanFunction;
  onIdenticalScanResult: () => void;
  rememberResult: boolean;
}) {
  const {onNewScanResult, onIdenticalScanResult, rememberResult} = props;

  const authContext = useContext(AuthContext);
  const [lastScanResult, setLastScanResult] =
    useState<UnderoofQrScanResult | null>(null);

  const [hasPermission, setHasPermission] = useState(false);

  async function handleRequestPermission() {
    const status = await requestCameraPermission();
    if (status === 'granted') {
      setHasPermission(true);
    } else {
      setHasPermission(false);
    }
  }

  useEffect(() => {
    handleRequestPermission();
  }, []);

  useEffect(() => {
    if (!rememberResult) {
      setLastScanResult(null);
    }
  }, [rememberResult]);

  const fetchResponseForCode = async (
    currentScanResult: UnderoofQrScanResult,
  ) => {
    const {objectId, ticketCode} = currentScanResult;
    const response = await checkTicket(
      ticketCode,
      objectId,
      authContext.token ?? '',
    );
    console.log('Response: ', response);

    return response;
  };

  const handleBarCodeScanned = async (event: BarCodeReadEvent) => {
    const {type, data} = event;
    // console.log('Scanned: ', type, data);

    const parsed = parseCode(data);
    if (parsed == null) {
      setLastScanResult(null);
      return onNewScanResult(
        Result.err(new OtherError('Invalid QR code')) as any,
      );
    }

    if (lastScanResult?.ticketCode === parsed.ticketCode) {
      return onIdenticalScanResult();
    }

    const response = await fetchResponseForCode(parsed);
    onNewScanResult(response);
    setLastScanResult(parsed);
  };

  return (
    <QrScannerContainer>
      {hasPermission && (
        <QrScanner
          captureAudio={false}
          ref={ref => {
            // @ts-ignore
            this.camera = ref;
          }}
          onBarCodeRead={handleBarCodeScanned}></QrScanner>
      )}
    </QrScannerContainer>
  );
}

const QrScannerContainer = styled.View`
  height: undefined;
  width: 100%;
  aspect-ratio: 1;
  background-color: ${colors.black};
  justify-content: flex-start;
  align-items: center;
  border: 1px solid ${colors.white};
  border-left-width: 0;
  border-right-width: 0;
  overflow: hidden;
`;

const QrScanner = styled(RNCamera)`
  width: 100%;
  height: 100%;
`;
