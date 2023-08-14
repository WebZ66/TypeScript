type FnType<T> = T & { apply: (context: any, arg: any[]) => void }
//你函数传入啥，就是啥类型。不需要自己额外定义传入的函数fn的类型喽~
export const debounce = <T, E>(fn: FnType<T>, time: E) => {
    let timer: NodeJS.Timeout | null = null
    return function (this: any, ...args: any[]) {
        let context = this
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(context, args)
        }, time as number)
    }
}
