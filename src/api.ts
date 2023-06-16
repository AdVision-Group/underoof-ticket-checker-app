import {z} from 'zod';
import axios, {AxiosError} from 'axios';
import {Result, ResultT} from '@flagg2/result';
//TODO: use env
export const API_URL = 'https://underoof-tickets-dev-ikx4difnxa-ew.a.run.app';
const API_TIMEOUT = 5000;

async function get<T extends z.ZodType>(
  schema: T,
  url: string,
  headers?: any,
): Promise<z.infer<T>> {
  const result = await axios.get(url, {
    timeout: API_TIMEOUT,
    headers,
  });

  return schema.parse(result.data);
}

async function post<T extends z.ZodType>(
  schema: T,
  url: string,
  headers: any,
  data: any,
): Promise<z.infer<T>> {
  const result = await axios.post(url, data, {
    timeout: API_TIMEOUT,
    headers,
  });

  return schema.parse(result.data);
}

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type UnwrapResult<T> = T extends ResultT<infer U, any> ? U : never;
export type Unwrap<T extends (...args: any) => any> = UnwrapResult<
  UnwrapPromise<ReturnType<T>>
>;

type ResponseSchema = z.infer<ReturnType<typeof wrapResponseSchema>>;

function wrapResponseSchema<T>(dataSchema: z.ZodType<T>) {
  return z.object({
    data: dataSchema,
    message: z.string(),
    status: z.number(),
  });
}

export class ApiError extends Error {
  data: any;
  status: number;
  constructor(message: string, data: any, status: number) {
    super(message);
    this.name = 'ApiError';
    this.data = data;
    this.status = status;
  }
}

export function isApiError(error: Error): error is ApiError {
  return error instanceof ApiError;
}

export class ResponseError extends Error {
  data: any;
  constructor(message: string, data: any) {
    super(message);
    this.name = 'ResponseError';
    this.data = data;
  }
}

export function isResponseError(error: Error): error is ResponseError {
  return error instanceof ResponseError;
}

export class NoInternetError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TimeoutError';
  }
}

export function isNoInternetError(error: Error): error is NoInternetError {
  return error instanceof NoInternetError;
}

export class OtherError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UnknownError';
  }
}

export function isOtherError(error: Error): error is OtherError {
  return error instanceof OtherError;
}

type FetchOptions<T> = {
  responseSchema: z.ZodType<T>;
  url: string;
  headers?: Record<string, string>;
} & (
  | {
      method: 'get';
    }
  | {
      method: 'post';
      data: any;
    }
);

export async function zodFetch<
  T,
  E extends ApiError | ResponseError | NoInternetError | OtherError,
>(opts: FetchOptions<T>): Promise<ResultT<T, E>> {
  const {method, responseSchema, url, headers} = opts;
  try {
    let result =
      method === 'get'
        ? await get(wrapResponseSchema(responseSchema), url, headers)
        : await post(
            wrapResponseSchema(responseSchema),
            url,
            headers,
            opts.data,
          );

    return Result.ok(result.data) as ResultT<T, E>;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.data === undefined) {
        return Result.err(new NoInternetError('No internet')) as ResultT<T, E>;
      }
      const res = error.response?.data as ResponseSchema;
      const {message, data, status} = res;
      return Result.err(new ApiError(message, data, status)) as ResultT<T, E>;
    }

    if (error instanceof z.ZodError) {
      return Result.err(
        new ResponseError(error.message, error.issues),
      ) as ResultT<T, E>;
    }

    console.error('Unknown error', error);
    return Result.err(new OtherError('Unknown error')) as ResultT<T, E>;
  }
}

export type FetchError =
  | ApiError
  | ResponseError
  | NoInternetError
  | OtherError;
