import {
  ApiError,
  NoInternetError,
  isApiError,
  isNoInternetError,
} from '../../api';
import {CheckTicketResult} from '../UnderoofQrScanner/api';

export function getCountdownBarWidth(startCount: number, currentCount: number) {
  const startAt = 0.9;

  if (currentCount > startCount * startAt) {
    return '100%';
  }

  startCount *= startAt;

  return `${(currentCount / startCount) * 100}%`;
}

export function areAllScansWithinXSeconds(
  scanDates: Date[],
  seconds: number,
): boolean {
  const dates = [...scanDates];
  dates.sort((a, b) => a.getTime() - b.getTime());

  for (let i = 0; i < dates.length - 1; i++) {
    const diff = dates[i + 1].getTime() - dates[i].getTime();
    if (diff > seconds * 1000) {
      return false;
    }
  }

  return true;
}

export function secondsSinceFirstScan(scanDates: Date[]): number {
  const dates = [...scanDates];
  dates.sort((a, b) => a.getTime() - b.getTime());

  if (dates.length === 0) {
    return 0;
  }

  const diff = new Date().getTime() - dates[0].getTime();
  return Math.floor(diff / 1000);
}

export function getSlovakWarningText(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  seconds -= hours * 3600;
  const minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;

  let result = 'Použitý pred ';
  if (hours > 0) {
    result += `${hours} h `;
  }
  if (minutes > 0) {
    result += `${minutes} min `;
  }
  result += `${seconds} s `;

  return result;
}

type Status = 'pending' | 'ok' | 'warn' | 'error';

export function getStatusFromResult(result: CheckTicketResult | null): Status {
  if (result === null) {
    return 'pending';
  }
  if (result.isOk()) {
    if (
      areAllScansWithinXSeconds(
        result.value.ticket.TicketScans.map(scan => scan.createdAt as Date),
        10,
      )
    ) {
      return 'ok';
    } else {
      return 'warn';
    }
  } else {
    return 'error';
  }
}

export function getErrorText(result: CheckTicketResult | null): string {
  if (result === null) {
    return '';
  }
  if (result.isOk()) {
    return '';
  } else {
    const error = result.err;
    if (error instanceof NoInternetError) {
      return 'Nedarí sa pripojiť k serveru, skontrolujte pripojenie k internetu.';
    } else {
      error;
    }
    if (error instanceof ApiError) {
      if (error.status === 401 || error.status === 403) {
        return 'Nemáte oprávnenie na kontrolu lístkov. Skúste sa znova prihlásiť.';
      }
    }
    return 'Neplatný lístok';
  }
}
