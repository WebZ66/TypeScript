//.d.ts只会声明没有实现
//定义模块的类型声明
declare module 'lodash' {
    export function join(...args: any[]): any
}
declare type IdType = number | string

//为自己的变量定义类型声明
declare const whyName: string

declare class Person {
    name: string
    age: number
    constructor(name: string, age: number)
}

declare namespace $ {
    export function ajax(setting: any): any
}
