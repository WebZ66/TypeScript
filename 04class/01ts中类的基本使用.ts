class Animal {
    age: number
    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }
    get name() {
        return 'jack'
    }
    set name(value) {
        this.name = value
    }
}
