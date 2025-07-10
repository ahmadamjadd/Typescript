type toPromise<T> = {
    [K in keyof T] : Promise<T[K]>;
}