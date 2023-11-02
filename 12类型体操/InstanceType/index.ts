class Person {}
const p1: Person = new Person()
//typeof 类，获取到的是构造函数具体的类型
//InstanceType<类的类型> 获取到的是由构造函数创造出的具体的实例类型
type HYPerson = InstanceType<typeof Person>
const p2: HYPerson = new Person()

function factory<T extends new () => any>(ctor: T): InstanceType<T> {
    return new ctor()
}

export {}
