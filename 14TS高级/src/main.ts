type MyOmit<T, K extends keyof T> = {
    [P in Exclude<keyof T, K>]: T[P]
}

type IPerson = {
    name: string
    age: number
}
type IStudent = MyOmit<IPerson, 'age'>
let student: IStudent = {
    name: 'zds',
}
console.log(student)
