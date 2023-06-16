import {z} from 'zod';
import {API_URL, Unwrap, zodFetch} from '../../api';

const DEFINITION_OF_CLOSE_DATE = 7;

export function fetchSalesWithCloseDate() {
  return zodFetch({
    url: `${API_URL}/sale?happeningWithinXDays=${DEFINITION_OF_CLOSE_DATE}`,
    method: 'get',
    responseSchema: z.array(
      z.object({
        id: z.string(),
        eventName: z.string(),
        eventDate: z.string(),
      }),
    ),
  });
}

type SalesWithCloseDate = Unwrap<typeof fetchSalesWithCloseDate>;
export type SaleWithCloseDate = SalesWithCloseDate[number];
