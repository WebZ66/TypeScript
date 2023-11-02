interface IName {
    name: string
    age: number
}
type A = IName['name']

type MyPartial<T> = {
    [k in keyof T]?: T[k]
}

//扩展一下，将传入的属性变为可选 ,K是联合类型,属于T的键名组成的联合类型
type PartialOptional<T, K extends keyof T> = {
    [p in K]?: T[p]
}

type Eg1 = PartialOptional<{ key1: string; key2: number; key3: number }, 'key1' | 'key2'>
