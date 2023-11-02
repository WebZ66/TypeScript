type NonUndefined<T> = T extends undefined ? never : T

//获取T中所有属性值类型为函数的key组成的联合类型

//先找出其所有属性值类型为函数的对象类型，同时将属性值类型变为其属性名，如果不是函数类型，那么类型为never
//最后通过 对象类型[keyof 对象类型] 获取到所有属性值不为never构成的联合类型
type FunctionKeys<T extends object> = {
    [P in keyof T]: NonUndefined<T[P]> extends Function ? P : never
}[keyof T]

type Person = {
    name: () => void
    age: () => void
    score: number
}
type p = FunctionKeys<Person>

type People = {
    name: string
    age: number
    score: never
}
type keys = keyof People
type values = People[keys]

export {}
