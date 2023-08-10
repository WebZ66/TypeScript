interface IPerson {
    [index: number]: string
    [propName: string]: any
}
let p = {
    name: 'zds',
    age: 12,
    height: 18
}

const info: IPerson = p

export {}
