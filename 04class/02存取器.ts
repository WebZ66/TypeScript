class Person {
    //约定俗称的规范：私有属性会加_
    private _name: string
    constructor(name: string) {
        this._name = name
    }
    set name(newValue: string) {
        this._name = newValue
    }
    get name() {
        return this._name
    }
}

let p = new Person('zds')
console.log(p.name)
export {}
