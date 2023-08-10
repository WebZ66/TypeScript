    function getObjectProperty<O, K extends keyof O>(obj: O, key: K) {
        return obj[key]
    }

    const info = {
        name: 'zds',
        age: 22
    }
    interface IInfo {
        name: string
        age: number
    }
    //keyof：将接口中的类型名转化称  字面量联合类型
    type keyType = keyof IInfo //等同于 "name"|"age"

    const name2 = getObjectProperty<IInfo, keyType>(info, 'name')
    const name = getObjectProperty<IInfo, 'name' | 'age'>(info, 'age')

    export {}
