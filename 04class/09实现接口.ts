interface IKun {
    name: string
    age: string
    slogan: string
    play: () => void
}

interface IRun {
    fly: string
    running: () => void
}

class Person implements IKun, IRun {
    fly: string
    constructor(public name: string, public age: string, public slogan: string, fly: string) {}
    play() {}
    running() {}
}

let p = new Person('zds', '12', 'xx', 'fly')
