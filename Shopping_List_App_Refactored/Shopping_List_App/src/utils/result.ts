// src/utils/result.ts

export type Result<T, E> = Ok<T, E> | Err<T, E>;

class Ok<T, E> {
  readonly value: T;

  constructor(value: T) {
    this.value = value;
  }

  isOk(): this is Ok<T, E> {
    return true;
  }

  isErr(): this is Err<T, E> {
    return false;
  }

  map<U>(fn: (value: T) => U): Result<U, E> {
    try {
      return Result.Ok(fn(this.value));
    } catch (error) {
      return Result.Err(error as E);
    }
  }

  flatMap<U>(fn: (value: T) => Result<U, E>): Result<U, E> {
    try {
      return fn(this.value);
    } catch (error) {
      return Result.Err(error as E);
    }
  }

  mapErr<F>(_fn: (error: E) => F): Result<T, F> {
    // Ok value doesn't transform errors, so return self
    return Result.Ok<T, F>(this.value);
  }

  unwrap(): T {
    return this.value;
  }
}

class Err<T, E> {
  readonly error: E;

  constructor(error: E) {
    this.error = error;
  }

  isOk(): this is Ok<T, E> {
    return false;
  }

  isErr(): this is Err<T, E> {
    return true;
  }

  map<U>(_fn: (value: T) => U): Result<U, E> {
    return Result.Err(this.error);
  }

  flatMap<U>(_fn: (value: T) => Result<U, E>): Result<U, E> {
    return Result.Err(this.error);
  }

  mapErr<F>(fn: (error: E) => F): Result<T, F> {
    try {
      return Result.Err<T, F>(fn(this.error));
    } catch (e) {
      return Result.Err<T, F>(e as F);
    }
  }

  unwrap(): never {
    throw new Error(`Tried to unwrap an Err: ${this.error}`);
  }
}


export const Result = {
  Ok<T, E = never>(value: T): Result<T, E> {
    return new Ok<T, E>(value);
  },
  Err<T = never, E = unknown>(error: E): Result<T, E> {
    return new Err<T, E>(error);
  },
};
