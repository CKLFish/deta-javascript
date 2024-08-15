import { NullType, ObjectType, ArrayType } from '../basic';

export type WithKey<T> = {
  key: string;
} & T;

export type DeleteResponse = NullType;

export type PutResponse = ObjectType | NullType;

export type GetResponse<T> = T | NullType;

export type InsertResponse = ObjectType;

export interface PutManyResponse {
  processed: {
    items: ArrayType;
  };
}

export type UpdateResponse = NullType;

export interface FetchResponse<T> {
  items: T[];
  count: number;
  last?: string;
}
