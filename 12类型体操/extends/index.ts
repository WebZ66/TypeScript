type MyReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : false //条件，判断传入的类型T是否满足是函数
//并根据函数的返回值来确定MyReturnType最终的类型

//让ts自己推断T类型的返回值

type foo = (str: string) => number
//根据你传入参数的返回值类型 来推断出类型
let r: MyReturnType<foo>
