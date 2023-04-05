import {z} from 'zod';
import axios, {AxiosError} from 'axios';
import {Result, ResultT} from '@flagg2/result';
//TODO: use env
export const API_URL = 'https://underoof-tickets-dev-ikx4difnxa-ew.a.run.app';
const API_TIMEOUT = 5000;

function zodGet<T>(schema: z.ZodType<T>, url: string) {
  return axios
    .get(url, {
      timeout: API_TIMEOUT,
    })
    .then(response => {
      return schema.parse(response.data);
    });
}

function zodPost<T>(schema: z.ZodType<T>, url: string, data: any) {
  return axios
    .post(url, data, {
      timeout: API_TIMEOUT,
    })
    .then(response => {
      return schema.parse(response.data);
    });
}

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type UnwrapResult<T> = T extends ResultT<infer U, any> ? U : never;
export type Unwrap<T extends (...args: any) => any> = UnwrapResult<
  UnwrapPromise<ReturnType<T>>
>;

type ResponseSchema = z.infer<ReturnType<typeof responseSchema>>;

function responseSchema<T>(dataSchema: z.ZodType<T>) {
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

export class UnknownError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UnknownError';
  }
}

export function isUnknownError(error: Error): error is UnknownError {
  return error instanceof UnknownError;
}

export async function zodFetch<
  T,
  E extends ApiError | ResponseError | NoInternetError | UnknownError,
>(dataSchema: z.ZodType<T>, url: string): Promise<ResultT<T, E>> {
  try {
    const result = await zodGet(responseSchema(dataSchema), url);
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
    return Result.err(new UnknownError('Unknown error')) as ResultT<T, E>;
  }
}
