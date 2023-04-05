import {z} from 'zod';
import {API_URL, NoInternetError, Unwrap, zodFetch} from '../../api';
import {Result} from '@flagg2/result';

const DEFINITION_OF_CLOSE_DATE = 7;

export async function fetchSalesWithCloseDate() {
  const result = await zodFetch(
    z.array(
      z.object({
        id: z.string(),
        eventName: z.string(),
        eventDate: z.string(),
      }),
    ),
    `${API_URL}/sale?happeningWithinXDays=${DEFINITION_OF_CLOSE_DATE}`,
  );
  return result;
}

type SalesWithCloseDate = Unwrap<typeof fetchSalesWithCloseDate>;
export type SaleWithCloseDate = SalesWithCloseDate[number];
