//如果没有对ts进行特殊配置，this是any类型

//1.对象方法中的this
const obj = {
    name: 'zds',
    studying() {
        //默认情况下，this是any类型
        console.log(this.name, '正在studying')
    }
}

let obj2 = {
    name: 'xqq'
}
obj.studying.call(obj2)
