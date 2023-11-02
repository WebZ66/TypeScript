type Person = {
    name: string
    age: number
}

type p = Readonly<Person>

type MyReadonly<T> = {
    readonly [k in keyof T]: T[k]
}

type p2 = MyReadonly<Person>

type ReadonlyOptional<T, K extends keyof T> = {
    readonly [P in K]: T[P]
}

type p3 = ReadonlyOptional<Person, 'name'>
