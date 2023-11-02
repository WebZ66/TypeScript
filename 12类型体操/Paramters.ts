type FlattenArray<T extends Array<any>> = T extends Array<infer P> ? P : never

type a1 = FlattenArray<[string, number]>
