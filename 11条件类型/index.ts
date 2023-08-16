type myRecord<K extends keyof any, T> = {
    [p in K]: T
}
