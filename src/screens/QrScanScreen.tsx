import styled from 'styled-components/native';
import UnderoofQrScanner from '../components/UnderoofQrScanner/component';
import {colors} from '../styles';
import {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../contextWrappers/AuthContext/context';
import {CheckTicketResult} from '../components/UnderoofQrScanner/api';

import {useCountdown} from 'usehooks-ts';
import QrStatus from '../components/QrStatus/component';
import {isApiError} from '../api';
import {getStatusFromResult} from '../components/QrStatus/services';

const COUNTDOWN_DURATION_MS = 3000;
const COUNTDOWN_INTERVAL_MS = 30;

export default function QrScanScreen() {
  const authContext = useContext(AuthContext);

  const [result, setResult] = useState<CheckTicketResult | null>(null);
  const [status, setStatus] = useState<'ok' | 'warn' | 'error' | 'pending'>(
    'pending',
  );

  const startingCount = COUNTDOWN_DURATION_MS / COUNTDOWN_INTERVAL_MS;
  const [count, {startCountdown, stopCountdown, resetCountdown}] = useCountdown(
    {
      countStart: startingCount,
      intervalMs: COUNTDOWN_INTERVAL_MS,
      countStop: 0,
    },
  );

  const getBgColor = () => {
    switch (status) {
      case 'ok':
        return colors.green;
      case 'warn':
        return colors.yellow;
      case 'error':
        return colors.red;
      case 'pending':
        return colors.mediumGrey;
    }
  };

  useEffect(() => {
    setStatus(getStatusFromResult(result));
  }, [result]);

  useEffect(() => {
    startCountdown();
  }, []);

  useEffect(() => {
    if (count <= 0) {
      setResult(null);
      stopCountdown();
    }
  }, [count]);

  return (
    <Screen
      style={{
        backgroundColor: getBgColor(),
      }}>
      <StatusContainer>
        <QrStatus
          currentCount={count}
          startingCount={startingCount}
          result={result}
        />
      </StatusContainer>
      <UnderoofQrScanner
        onNewScanResult={result => {
          if (result.isErr() && isApiError(result.err)) {
            // If is too many requests, don't show error
            if (result.err.status === 429) {
              return;
            }
          }
          setResult(result);
          resetCountdown();
          startCountdown();
        }}
        onIdenticalScanResult={() => {
          resetCountdown();
          startCountdown();
        }}
        rememberResult={count > 0}></UnderoofQrScanner>
      {/* <LogoutButtonContainer>
        <LogoutButton
          onPress={() => {
            authContext.logout();
          }}></LogoutButton>
      </LogoutButtonContainer> */}
    </Screen>
  );
}

const Screen = styled.SafeAreaView`
  width: 100%;
  height: 100%;
  background-color: ${colors.mediumGrey};
  justify-content: flex-start;
  align-items: center;
  postion: relative;
`;

const LogoutButtonContainer = styled.View`
  position: absolute;
  bottom: 5px;
  right: 5px;
`;

const StatusContainer = styled.View`
  width: 100%;
  height: 20%;
  justify-content: center;
  margin-top: 0;
  align-items: center;
`;
