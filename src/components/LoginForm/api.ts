import {z} from 'zod';
import {API_URL, Unwrap, zodFetch} from '../../api';

export function login(email: string, password: string, saleId: string) {
  return zodFetch({
    url: `${API_URL}/ticketChecker/login`,
    method: 'post',
    data: {
      saleId,
      email,
      password,
    },
    responseSchema: z.object({
      jwt: z.string(),
      id: z.string(),
    }),
  });
}

export type LoginResponse = Unwrap<typeof login>;
