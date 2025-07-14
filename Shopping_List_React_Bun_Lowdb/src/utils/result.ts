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
    return Result.Ok(fn(this.value));
  }

  flatMap<U>(fn: (value: T) => Result<U, E>): Result<U, E> {
    return fn(this.value);
  }

  mapErr<F>(_fn: (error: E) => F): Result<T, F> {
    return Result.Ok(this.value);
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
    return Result.Err(fn(this.error));
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
