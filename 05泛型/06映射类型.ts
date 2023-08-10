//映射类型不能使用interface来定义
/* 
Type='IPerson'
keyof="name"|"age"
*/
type MapPerson<Type> = {
    [Property in keyof Type]: Type[Property]
}

interface IPerson {
    name: string
    age: number
}

type MyPerson = MapPerson<IPerson>

export {}
