# 为什么要有TS

因为我们需要`错误出现的越早越好`，能在写代码的时候发现错误，就不要在编译时发现。能在编译时发现，就不要在运行期间发现错误。



js的类型缺失案例： 返回undefined

```js
function getLength(args){
    return args.length
}
//调用该函数
console.log(getLength(1));  //undefined
console.log(getLength());  //报错
```

![](https://gitee.com/zhengdashun/pic_bed/raw/master/img/image-20230620142740865.png)



# TS环境的搭建

```
npm install typescript -g   //tsc --version查看版本 
npm install ts-node -g  
```

tsc将ts文件编译成js。ts-node编译后直接执行该js文件。



方法二：通过webpack配置对应的loader

```
npm init -y  //生成package.json
tsc --init   //生成tsconfig.json
```

```
安装：
npm install typescript ts-loader webpack webpack-cli webpack-dev-server html-webpack-plugin
```

**webpack.config.js配置**

```js
//配置webpack智能提示
const { Configuration } = require('webpack')
/**
 * @type {Configuration} //配置智能提示
 */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'development',
  entry: './src/main.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.json', '.vue', '.jsx', '.tsx', '.ts'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  module: {
    rules: [{ test: /\.ts/, use: ['ts-loader'] }],
  },
  plugins: [new HtmlWebpackPlugin({ template: './dist/index.html' })],
  devServer: {
    hot: true,
    port: 9000,
    open: true,
    compress: true,
  },
}

```

![image-20230621110535980](https://gitee.com/zhengdashun/pic_bed/raw/master/img/image-20230621110535980.png)



# js中通用类型的类型注解

```js
let z: string = 'zds'
console.log(z)
//如果给z赋值其他类型的值就会报错
```

**注意**：

- `string`:TypeScript给我们定义标识符时，提供的字符串类型
- `String`：javascript中字符串的包装类   (类似于Date  let mess = new String('123'))



## null和undefined

在ts中，null和undefined既是实际的值，也是实际的类型

```ts
let a: null = null
let b:undefined=undefined
```



# 变量的类型推导

> 在开发中，有时候为了方便，并不会在每个变量的后面添加类型注解。

**声明一个变量时，如果有直接进行赋值，会根据赋值的类型推导出对应的类型注解**

![image-20230621141052343](https://gitee.com/zhengdashun/pic_bed/raw/master/img/image-20230621141052343.png)

类型推导的特点：

- let进行类型推导，推导出来的是通用类型
- const进行类型推导，推导出来的是`字面量类型`

![image-20230621141326445](https://gitee.com/zhengdashun/pic_bed/raw/master/img/image-20230621141326445.png)



# 数组的类型注解

如果直接给`数组赋值`的话，那么可以通过`类型推导`，推导出对应的类型注解。

![image-20230621141647029](https://gitee.com/zhengdashun/pic_bed/raw/master/img/image-20230621141647029.png)

**注意：真实开发中，数组一般存放相同的类型，不要存放不同的类型**

**明确的指定<数组>的类型注解:**

- string[]

  ```ts
  let name: string[] = ['1', '2']
  ```

- Array<string>   （泛型的写法）

  ```ts
  let name: Array<string> = ['1', '2']
  ```

  

# 对象的类型注解

和数组一样，如果直接给 `对象赋初始值`的话，那么可以通过`类型推导`，推导出对应的`类型注解`

![image-20230621142238216](https://gitee.com/zhengdashun/pic_bed/raw/master/img/image-20230621142238216.png)

**明确的指定对象的类型注解：**

```ts
//当然可以通过type关键字进行优化
let info: {
  name: string
  age: number
} = {
  name: 'zds',
  age: 12,
}

```

**注意：不要随便使用object类型，因为它代表的是一个`空对象类型`**

```ts
let info: object = {
  name: 'zds',
  age: 12,
}
//object类型其实表示一个空对象类型
console.log(info.name);//会直接报错
```



## 对象类型的使用

常常使用type来定义对象类型。

```ts
type PointType = { x: number; y?: number }
function print(point: PointType) {
  console.log(point.x)
  console.log(point.y)
}
print({ x: 1, y: 2 })
```





# 函数的类型

##     参数类型

在我们定义一个ts的`函数`时，我们必须明确的`指定参数的类型`。不然默认是any类型，会提示错误

```ts
function sum(num1: number, num2: number) {
  return num1 + num2
}
```

##     返回值类型

> 返回值类型可以明确的指定，也可以通过类型推导推导出来~

**因为指定了参数类型，函数的返回值类型是可以通过类型推导，推导出来**

![image-20230621143301114](https://gitee.com/zhengdashun/pic_bed/raw/master/img/image-20230621143301114.png)

**明确的指定返回值的类型注解**

![image-20230621143404589](https://gitee.com/zhengdashun/pic_bed/raw/master/img/image-20230621143404589.png)



## 回调函数的参数类型

```ts
name.forEach((item: string, index: number, arr) => {
  console.log(item)
})
```

**这个回调函数是个匿名函数，是否需要添加类型注解呢**

结论：`可以加，但是最好不要加！！`

因为forEach接受回调函数作为参数的时候，已经写明了它需要的类型。

![image-20230621144212412](https://gitee.com/zhengdashun/pic_bed/raw/master/img/image-20230621144212412.png)

这个过程称为`上下文类型`，因为函数执行的上下文可以帮助确定参数和返回值的类型。



# TS扩展的类型 

##   any类型

（使用any并不可耻,但不要处处用❤❤❤❤❤）

 **any类型是一种讨巧的TypeScript手段**，相当于回到了javascript

- 我们可以对`any类型的变量进行任何的操作`，包括`获取不存在的属性、方法`
- 我们也可以对一个`any类型的变量赋值任何的值、比如数字、字符串等等`

**在某些情况下，我们确实`无法确定一个变量的类型`，并且可能`它会发生一些变化`，这个时候我们可以使用`any类型`**

常见情形： ①从服务器取得了很复杂的数据(有时间可以一个个定义，没时间直接any)。

```ts
type People = {
  name: string
  age: number
  [propName: string]: any  //剩余参数类型定义为any
}
let people: People = {
  name: 'zds',
  age: 12,
  score: [1, 2],
}
```

​				    ②`引入一些第三方库时，缺失了类型注解`



##  unknown类型

**unknown是ts中特殊的一种类型，它用于描述类型不确定的变量**

- [ ] 和any类型有点类似，但是`对unknown类型的值直接操作是非法`的，需要进行`类型缩小`！ （any类型是合法的）

![image-20230621151559970](https://gitee.com/zhengdashun/pic_bed/raw/master/img/image-20230621151559970.png)![image-20230621151606572](https://gitee.com/zhengdashun/pic_bed/raw/master/img/image-20230621151606572.png)

**因此，unknown类型默认情况下，进行任何操作都需要进行类型缩小,才能根据缩小后的类型，进行对应的操作**

```ts
let foo: unknown = 'aaa'
foo = 123

if(typeof foo==='string'){
    console.log(foo.length);
}
```

