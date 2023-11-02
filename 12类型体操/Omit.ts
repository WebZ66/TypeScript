//参数T对应的类型，K需要去除的属性
type MyOmit<T, K extends keyof T> = {
    //存在于T的属性联合中，不存在K的属性联合中
    [P in Exclude<keyof T, K>]: T[P]
}
type A = MyOmit<{ name: string; age: number }, 'name'>

//利用Pick实现  挑选出不属于K的
type MyOmit2<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type B = MyOmit2<{ name: string; age: number }, 'age'>

export {}
