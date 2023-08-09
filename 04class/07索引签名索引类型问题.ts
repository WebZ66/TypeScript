interface IIndexType {
    [index: string]: string
}

const name: IIndexType = ['aa', 'bb', 'cc']

//[index: string]: any 不报错 索引要求必须是string

//[index: string]: string 报错
/* 
因为严格的字面量赋值检测！！！  直接赋值了一个数组，数组里还有一些方法forEach等等
严格的字面量赋值检测发现不匹配就会报错
*/

export {}
