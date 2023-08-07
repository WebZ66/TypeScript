interface IFn {
    name: string
    //函数可以调用：函数签名
    (num1: number, num2: number): number
}
let fn2: IFn = (num1: number, num2: number): number => {
    return 123
}
fn2.name = 'zds'

fn2(1, 2)
