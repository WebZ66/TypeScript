//将其部分属性变为可选
type PartialOptional<T, K extends keyof T> = Partial<Pick<T, K>>

type Person = {
    name: string
    age: number
}

type A = PartialOptional<Person, 'name'>
export {}
