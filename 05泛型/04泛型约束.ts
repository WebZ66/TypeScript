interface ILength {
    length: number
}
function getLength(arg: ILength) {
    return arg
}
const a = getLength([1, 2, 3])

//获取传入的内容，这个内容必须有length属性

function getInfoHasLength<T extends ILength>(args: T): T {
    return args
}

const c = getInfoHasLength({ length: 1, name: 'zds' })

export {}
