class Person {}

const p1: Person = new Person()
//typeof 类：本质上获取到的是类的构造函数类型
//InstanceType<typeof Person> ： 获取构造函数构造出来的实例的类型
type HYPerson = InstanceType<typeof Person>
