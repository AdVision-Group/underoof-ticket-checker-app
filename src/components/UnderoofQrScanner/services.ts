import {ObjectId} from 'bson';

export type UnderoofQrScanResult = {
  objectId: string;
  ticketCode: string;
};

// Underoof qr codes should be in format: objectId:ticketCode
export function parseScanResult(data: string): UnderoofQrScanResult | null {
  try {
    const parsed = data.split(':');
    if (parsed.length !== 2) {
      return null;
    }

    const [objectId, ticketCode] = parsed;
    if (
      ObjectId.isValid(objectId) &&
      typeof ticketCode === 'string' &&
      typeof objectId === 'string'
    ) {
      return {
        objectId,
        ticketCode,
      };
    }
    return null;
  } catch (e) {
    return null;
  }
}
