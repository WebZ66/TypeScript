interface IPerson {
    name: string
    age: number
    friend?: {
        name: string
    }
}

const p1: IPerson = {
    name: 'zds',
    age: 12
}

//访问某个对象深层次属性的时候，其子对象可能为空时，可以用?可选链的方式，选择子对象属性。
//这样的话，如果friend为空，那么就会直接返回undefined
console.log(p1.friend?.name) //undefined

// 强制告诉ts编译器不为空
p1.friend!.name = 'zds'
