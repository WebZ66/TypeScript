class Person {
    constructor(public name: string, public age: number) {
        this.name = name
        this.age = age
    }
}

interface IPerson {
    new (): Person
}

function MyPerson(name: string, age: number) {
    this.name = name
    this.age = age
}

let p: Person = new MyPerson('zds', 12)
console.log(p.name)

function createPerson(p: IPerson) {}

export {}
