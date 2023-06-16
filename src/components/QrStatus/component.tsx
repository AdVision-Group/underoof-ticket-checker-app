import {CheckTicketResult, TicketCheckResponse} from '../UnderoofQrScanner/api';
import styled from 'styled-components/native';
import {colors} from '../../styles';
import {
  areAllScansWithinXSeconds,
  getCountdownBarWidth,
  getSlovakWarningText as getWarningText,
  getStatusFromResult,
  secondsSinceFirstScan,
  getErrorText,
} from './services';
import PrimaryText from '../PrimaryText/component';

export default function QrStatus(props: {
  result: CheckTicketResult | null;
  startingCount: number;
  currentCount: number;
}) {
  const {result} = props;

  const status = getStatusFromResult(result);
  const getStatusBarText = () => {
    switch (status) {
      case 'pending':
        return 'Naskenujte lístok';
      case 'ok':
        return result!.isOk() ? result.value.ticket.originalName : '';
      case 'warn':
        if (result!.isOk()) {
          const seconds = secondsSinceFirstScan(
            result.value.ticket.TicketScans.map(scan => scan.createdAt as Date),
          );
          return `${result.value.ticket.originalName}\n${getWarningText(
            seconds,
          )}`;
        }
      case 'error':
        return getErrorText(result);
    }
  };

  return (
    <StatusContainer
      style={{
        backgroundColor: 'transparent',
      }}>
      <InfoText>{getStatusBarText()}</InfoText>
      {status !== 'pending' && (
        <CountdownBarContainer>
          <CountdownBar
            style={{
              width: getCountdownBarWidth(
                props.startingCount,
                props.currentCount,
              ),
            }}></CountdownBar>
        </CountdownBarContainer>
      )}
    </StatusContainer>
  );
}

const StatusContainer = styled.View`
  flex: 1;
  position: relative;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const CountdownBarContainer = styled.View`
  width: 100%;
  align-items: flex-start;
  position: absolute;
  bottom: 0;
  left: 0;
`;

const CountdownBar = styled.View`
  width: 100%;
  height: 4px;
  background-color: ${colors.white};
`;

const InfoText = styled(PrimaryText)`
  font-size: 24px;
  color: ${colors.white};
  text-align: center;
`;
