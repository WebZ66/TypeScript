class Person {
    constructor(public name: string, public age: number) {
        this.name = name
        this.age = age
    }
}

class Dog {
    constructor(public name: string, public age: number) {
        this.name = name
        this.age = age
    }
    bark() {}
}

const p = new Person('zds', 12)

function getPerson(p: Person) {
    return p
}
getPerson(p)

const n: Person = getPerson(new Dog('xqq', 20))
