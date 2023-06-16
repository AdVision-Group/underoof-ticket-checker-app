import {z} from 'zod';
import {API_URL, Unwrap, zodFetch} from '../../api';
import dayjs from 'dayjs';

// {
//    TicketScans: {
//        TicketChecker: {
//            email: string;
//        };
//        id: string;
//        createdAt: Date;
//    }[];
//    id: string;
//    originalName: string;
// }
export function checkTicket(code: string, saleId: string, jwt: string) {
  console.log({
    url: `${API_URL}/ticketChecker/check`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  console.log({
    data: {
      code,
      saleId,
    },
  });

  return zodFetch({
    url: `${API_URL}/ticketChecker/check`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    data: {
      code,
      saleId,
    },
    responseSchema: z.object({
      ticket: z.object({
        TicketScans: z.array(
          z.object({
            id: z.string(),
            createdAt: z.coerce.date(),
          }),
        ),
        id: z.string(),
        originalName: z.string(),
      }),
    }),
  });
}

export type TicketCheckResponse = Unwrap<typeof checkTicket>;
export type CheckTicketResult = Awaited<ReturnType<typeof checkTicket>>;
