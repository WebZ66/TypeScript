class Person {
    name: string
    age: number
    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }
}
let p = new Person('zds', 12)
console.log(p.name)

export {}
