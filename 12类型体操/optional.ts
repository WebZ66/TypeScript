//T：传入的对象类型，K对应的键名构成的联合类型，将其变为可选
type Optional<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>

type Person = {
    name: string
    age: number
}

type A = Optional<Person, 'name'>

type Optional2<T, K extends keyof T> = {
    [P in K]?: T[P]
} & {
    //存在于T，不存在于K的联合类型,即Omit<T,K>
    [P in Exclude<keyof T, K>]: T[P]
}
type B = Optional2<Person, 'age'>
let b: B = {
    name: 'zds',
    age: 12,
}
export {}
