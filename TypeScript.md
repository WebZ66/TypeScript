---
highlight: a11y-dark
---
# 为什么要有TS

[TS入门教程](http://ts.xcatliu.com/basics/type-of-object-interfaces.html)

因为我们需要`错误出现的越早越好`，能在写代码的时候发现错误，就不要在编译时发现。`能在编译时发现，就不要在运行期间`发现错误。

js的类型缺失案例： `返回undefined`

```js
function getLength(args){
    return args.length
}
//调用该函数
console.log(getLength(1));  //undefined
console.log(getLength());  //报错
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/afd3a7e40f5a44efb9883f0a2937ebcb~tplv-k3u1fbpfcp-zoom-1.image)

# TS环境的搭建

    npm install typescript -g   //tsc --version查看版本 
    npm install ts-node -g  

tsc将ts文件编译成js。ts-node编译后直接执行该js文件。

方法二：通过webpack配置对应的loader

    npm init -y  //生成package.json
    tsc --init   //生成tsconfig.json

```js
安装：npm install typescript ts-loader webpack webpack-cli webpack-dev-server html-webpack-plugin
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
    rules: [{ test: /\.ts$/, use: ['ts-loader'] }],
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

![image-20230621110535980](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b344bd5d41fb439db4096e4a42786d28~tplv-k3u1fbpfcp-zoom-1.image)

# js中通用类型的类型注解

```js
let z: string = 'zds'
console.log(z)
//如果给z赋值其他类型的值就会报错
```

**注意**：

*   `string`:TypeScript给我们定义标识符时，`即提供的字符串类型`
*   `String`：javascript中**字符串的包装类**   (类似于Date  let mess = new String('123'))

## null和undefined

在ts中，null和undefined既是实际的值，也是实际的类型

```ts
let a: null = null
let b:undefined=undefined
```

# 变量的类型推导

> 在开发中，有时候为了方便，并不会在每个变量的后面添加类型注解。

**声明一个变量时，如果有直接进行赋值，会根据赋值的类型推导出对应的类型注解**

![image-20230621141052343](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/074db2fbfa47440eb1aa64f08e459d0c~tplv-k3u1fbpfcp-zoom-1.image)

类型推导的特点：

*   let进行类型推导，推导出来的是通用类型
*   const进行类型推导，推导出来的是`字面量类型`

![image-20230621141326445](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e5a2153d9b0b4cde8100d3ef8d30d562~tplv-k3u1fbpfcp-zoom-1.image)

# 数组的类型注解

如果直接给`数组赋值`的话，那么可以通过`类型推导`，推导出对应的类型注解。

![image-20230621141647029](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fe82bbd6978b49a389c4305994021d7f~tplv-k3u1fbpfcp-zoom-1.image)

**注意：真实开发中，数组一般存放相同的类型，不要存放不同的类型**

**明确的指定<数组>的类型注解:**

*   string\[]

    ```ts
    let name: string[] = ['1', '2']
    ```

*   Array<string>   （泛型的写法）

    ```ts
    let name: Array<string> = ['1', '2']
    ```

*   用接口表示数组(不常用)

    ```ts
    interface NumberArray {
        [index: number]: number
    }
    let arr: NumberArray = [1, 2, 3]
    ```

    虽然接口也可以用来描述数组，但是我们一般不会这么做，因为这种方式比前两种方式复杂多了。

    不过有一种情况例外，那就是它常用来表示`类数组`。

    类数组（Array-like Object）不是数组类型，比如 `arguments`：

    ```ts
    function sum() {
        let args: number[] = arguments;
    }
    
    // Type 'IArguments' is missing the following properties from type 'number[]': pop, push, concat, join, and 24 more.
    ```

    上例中，`arguments` 实际上是一个类数组，不能用普通的数组的方式来描述，而应该用接口：

    ```ts
    function sum() {
        let args: {
            [index: number]: number;
            length: number;
            callee: Function;
        } = arguments;
    }
    ```

    在这个例子中，我们除了约束当索引的类型是数字时，值的类型必须是数字之外，也约束了它还有 `length` 和 `callee` 两个属性。

    事实上常用的类数组都有自己的接口定义，如 `IArguments`, `NodeList`, `HTMLCollection` 等：

    ```ts
    function sum() {
        let args: IArguments = arguments;
    }
    ```

    其中 `IArguments` 是 TypeScript 中定义好了的类型，它实际上就是：

    ```ts
    interface IArguments {
        [index: number]: any;
        length: number;
        callee: Function;
    }
    ```

# 对象的类型注解

和数组一样，如果直接给 `对象赋初始值`的话，那么可以通过`类型推导`，推导出对应的`类型注解`

![image-20230621142238216](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5bb39542473a4757b91dd75b8c454aba~tplv-k3u1fbpfcp-zoom-1.image)

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

常常使用type来定义类型别名。

```ts
type PointType = { x: number; y?: number }
function print(point: PointType) {
  console.log(point.x)
  console.log(point.y)
}
print({ x: 1, y: 2 })
```

当然更常用的是[接口](#接口)

# 函数的类型

## `函数类型表达式`

在ts使用过程中，我们可以定义`函数参数的类型`，也可以定义 `函数返回值的类型`，那么**函数自身也应该有类型**

我们可以通过`type`编写 `函数类型表达式`来**表示函数类型**

```ts
(参数列表类型)=>返回值类型
```

```ts
type BarType = (arg: number) => number
const bar: BarType = (arg: number): number => {
    return 1
}
```

## `函数调用签名`

**函数类型表达式声明的函数不能`支持额外声明属性`，如果想描述一个带有属性的函数，可以在`一个对象类型中`写一个 `调用签名`**

![image-20230807185245373](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c900246b0d5a44b5b489bd3240fe7d4f~tplv-k3u1fbpfcp-zoom-1.image)

**函数调用签名(从对象的角度来看待这个函数，`既可以被调用，又可以新增额外属性`)**

```ts
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

```

总结：如果只是描述函数类型，就用函数类型表达式，如果要给函数新增属性，且函数作为对象需要能被调用，那么用函数调用签名

## `构造签名`

> 定义构造函数对应的类型，其实es6的类就是构造函数升级而来的。

**构造签名的一般语法如下：**
    
```js
    new (param1: type1, param2: type2, ...): ClassName;
```

**作用：构造签名在 TypeScript 中用于`描述类的构造函数类型`(当然类本身也是一种类型，但是`不好用来直接作为实例的类型`)，因此构造函数一般在`处理类实例的地方使用`，例如泛型约束、函数参数类型等。**

**案例1**


```js
  class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  sayHello() {
    console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`);
  }
}

type PersonConstructor = new (name: string, age: number) => Person;

const personConstructor: PersonConstructor = Person;
const person: Person = new personConstructor("John", 25);
person.sayHello(); // 输出：Hello, my name is John and I'm 25 years old.

```

```ts
class Person {
    constructor(public name: string, public age: number) {
        this.name = name
        this.age = age
    }
}

function MyPerson(name: string, age: number) {
    this.name = name
    this.age = age
}

let p: Person = new MyPerson('zds', 12)
console.log(p.name)

interface IPerson {
    new (): Person
}

function createPerson(p: IPerson) {}

```

## **匿名函数作为参数**

**重点：**

*   匿名函数或箭头函数如果`作为函数的参数`，那么`匿名函数自己的参数和返回值无需定义类型，它会自动推导`

*   如果某一个`函数的参数是函数，即回调函数形式`，那么ts不会对`回调函数定义的参数个数`进行校验，但是`调用的时候必须接受对应个数的参数了` （最经典的例子，forEach）

    <a name='回调函数参数个数检验'>回调函数参数个数</a>  **回调函数中只定义一个参数，不报错 (按照函数类型来说需要两个)**

    ![image-20230808141657082](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9be96bf0ce494918885ec051255a8e9c~tplv-k3u1fbpfcp-zoom-1.image)

    **但是如果定义多个，就会报错**

    ![image-20230808141949722](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a3f40b0862714a71b29377cc6591c5ee~tplv-k3u1fbpfcp-zoom-1.image)

```ts
type callbackType = (num1: number, num2: number) => number

function fn(callback: callbackType) {
    callback(10, 20)
}

fn(function (num1) {
    return 1
})
```

## 参数类型(不可推导)

在我们定义一个ts的`函数`时，我们必须明确的`指定参数的类型`。不然`默认是any类型`，会提示错误

```ts
function sum(num1: number, num2: number) {
  return num1 + num2
}
```

## 返回值类型(可推导)

> 返回值类型可以明确的指定，也可以通过类型推导推导出来\~

**因为指定了参数类型，函数的返回值类型是可以通过类型推导，推导出来**

![image-20230621143301114](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/daa81baee6d7438abe84b1151cd3e1de~tplv-k3u1fbpfcp-zoom-1.image)

**明确的指定返回值的类型注解**

![image-20230621143404589](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dc1532836d3d4a1ea2be558403aedb71~tplv-k3u1fbpfcp-zoom-1.image)

## 回调函数的参数类型

```ts
name.forEach((item: string, index: number, arr) => {
  console.log(item)
})
```

**这个回调函数是个匿名函数，是否需要添加类型注解呢**

结论：`可以加，但是最好不要加！！`

因为forEach接受回调函数作为参数的时候，已经写明了它需要的类型。

![image-20230621144212412](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6e2271a866184811a3457008d42d6609~tplv-k3u1fbpfcp-zoom-1.image)

这个过程称为`上下文类型`，因为函数执行的上下文可以帮助确定参数和返回值的类型。

**重点②：回调函数的参数个数是不会被ts所检验的**，**但是调用的时候需要传正确的参数**

[案例](#回调函数参数个数检验)

## 函数标识符的类型

**即用函数表达式方式创建的函数，其变量的类型（这时候就需要`用void表明没有返回值`了）**

如果要我们现在写一个对函数表达式（Function Expression）的定义，可能会写成这样：

```ts
let mySum = function (x: number, y: number): number {
    return x + y;
};
```

这是可以通过编译的，不过事实上，上面的代码只对等号右侧的匿名函数进行了类型定义，而等号左边的 `mySum`，是通过赋值操作进行类型推论而推断出来的。如果需要我们手动给 `mySum` 添加类型，则应该是这样： **即函数类型表达式**

```ts
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
};
```

注意不要混淆了 TypeScript 中的 `=>` 和 ES6 中的 `=>`。

在 TypeScript 的类型定义中，`=>` 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。

在 ES6 中，`=>` 叫做箭头函数，应用十分广泛，可以参考 [ES6 中的箭头函数](http://es6.ruanyifeng.com/#docs/function#箭头函数)。

案例：

```ts
type ExecFnType = (...args: any[]) => void
function delayExecFn(callback: ExecFnType) { //定义delayExecFn函数参数的类型
  setTimeout(() => {
    callback('why', 18)
  }, 1000)
}
function fn(...args: any[]) {  //定义fn函数参数的类型
  console.log(args)
}
delayExecFn(fn)

```

**用接口定义函数的形式**  即**函数调用签名**

我们也可以使用接口的方式来定义一个函数需要符合的形状：

```ts
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    return source.search(subString) !== -1;
}
```

采用函数表达式|接口定义函数的方式时，对等号左侧进行类型限制，可以保证以后对函数名赋值时保证参数个数、参数类型、返回值类型不变。

## 可选参数

可选参数的类型：`默认是联合类型` **xx|undefined**

![image-20230808150210325](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5cc16343e4334d9a9698e6e4d90e1382~tplv-k3u1fbpfcp-zoom-1.image)

所以使用可选参数的时候，必须进行`类型缩小`

```ts
function fn(x: number, y?: number) {
    if (y) {
        console.log(y + 10)
    }
}

```

## 参数默认值

在 ES6 中，我们允许给函数的参数添加默认值，**TypeScript 会将`添加了默认值的参数就是可选参数`**

**添加了默认值的参数，类型注解可以去掉，会自动进行类型推导**

```ts
function buildName(firstName: string, lastName: string = 'Cat') {
    return firstName + ' ' + lastName;
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');
```

此时就不受「`可选参数必须接在必需参数后面`」的限制了：

```ts
function buildName(firstName: string = 'Tom', lastName: string) {
    return firstName + ' ' + lastName;
}
let tomcat = buildName('Tom', 'Cat');
let cat = buildName(undefined, 'Cat'); //但是注意，第一个参数还是要传undefined的，因为不传是undefined
```

**有默认值的参数，是可以接受一个undefined的值，写了无效而已**

```ts
function fn(x: number, y = 100) {
    return (y as number) + 10
}
console.log(fn(1, undefined))
```

![image-20230808150809167](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/565e595f14c1471c88b420eb3460281d~tplv-k3u1fbpfcp-zoom-1.image)

## 剩余参数

ES6 中，可以使用 `...rest` 的方式获取函数中的剩余参数（rest 参数）：

```js
function push(array, ...items) {
    items.forEach(function(item) {
        array.push(item);
    });
}

let a: any[] = [];
push(a, 1, 2, 3);
```

事实上，`items` 是一个数组。所以我们可以用数组的类型来定义它：

```ts
function push(array: any[], ...items: any[]) {
    items.forEach(function(item) {
        array.push(item);
    });
}

let a = [];
push(a, 1, 2, 3);
```

注意，rest 参数只能是最后一个参数

## 函数重载

重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。

比如，我们需要实现一个函数 `reverse`，输入数字 `123` 的时候，输出反转的数字 `321`，输入字符串 `'hello'` 的时候，输出反转的字符串 `'olleh'`。

利用联合类型，我们可以这么实现：

```ts
function reverse(x: number | string): number | string | void {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
```

**然而这样有一个缺点，就是不能够精确的表达，还需要进行类型缩小**

> 在ts中，我们可以`编写不同的重载签名，以表示不同的方式进行调用，然后编写通用的函数实现`

```ts
//先编写重载签名
function add(arg1: number, arg2: number): number
function add(arg1: string, arg2: string): string

//再编写通用的函数实现   add()是不能直接被调用的~
function add(arg1: any, arg2: any) {
    return arg1 + arg2
}
add(1,2) // √
add(1,'2')// ×
```

![image-20230808152106913](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4515d999f7304a56a57faf3903503983~tplv-k3u1fbpfcp-zoom-1.image)

**函数重载和联合类型的对比**

可以使用联合类型的情况下，用联合类型。如果联合类型很复杂，需要进行类型缩小，那可以用重载

```ts
//重载
function getLength(str: string): number
function getLength(str: any[]): number
function getLength(str: any) {
    return str.length
}

//联合类型
function getLength(str: string | any[]) {
    return str.length
}

```

## 函数中的this

在vue3的composition api和react的hook中，this已经很少见了，但是我们封装一些库函数，可能函数需要this的

> 如果没有对ts进行特殊配置，那么this默认是any类型的。如果开启了会提示错误(默认是关闭的)
>
> ![image-20230808160555905](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/87badf099a25473b85b7e41b4e8f13bf~tplv-k3u1fbpfcp-zoom-1.image)

```ts
//1.对象方法中的this
const obj = {
    name: 'zds',
    studying() {
        //默认情况下，this是any类型
        console.log(this.name, '正在studying')
    }
}
```

```ts
//普通函数
function foo() {
    console.log(this) //也是any类型
}
```

**手动指定this类型 (用call或者apply)**

首先需要开启配置  noImplicitThis

*   函数的`第一个参数名字必须叫this`，可以`根据函数被调用的情况`，用于**声明this的类型**
*   后续调用函数传入参数时，从第二个参数开始传递

<!---->

    function foo(this: { name: string }, obj: { name: string }) {
        console.log(this)  //{name:'zds'}
    }
    foo.call({ name: 'zds' }, { name: 'xqq' })

## 函数总结

定义函数类型的方式：

①函数声明创建的函数，直接定义参数类型和返回值类型(返回值类型可以通过类型推导推导出来)。

②函数类型表达式(用type)

```ts
type FnType = () => number
const fn: FnType = () => {
    return 1
}
```

③函数调用签名(interface) 需要额外添加参数

```ts
interface IFn {
    name: string
    (x: number): void
}
const fn: IFn = (x: number) => {}
fn.name = 'zds'
```

# 类

## 基础用法

```ts
class Person {
    name: string
    age: number
    constructor(name: string, age:number) {
        this.name = name
        this.age = age
    }
}

let p1 = new Person('zds', 12)

```

如果不定义类型，默认是any

![image-20230808164451278](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/909c02f4beab4cf7874a943ee53a6831~tplv-k3u1fbpfcp-zoom-1.image)

**类的作用**

*   **创建出类的实例对象**
*   `类本身作为实例的类型`
*   **类也可以当作一个有`构造签名`的函数，即也可认为是构造函数类型**

## 类的继承  extends

使用 `extends` 关键字实现继承，子类中使用 `super` 关键字来调用父类的构造函数和方法。

```ts
class Animal {
    name: string
    age: number
    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }
}

class Cat extends Animal {
    constructor(name: string, age: number) {
        super(name, age)
    }
}

```

## 类的修饰符

| 修饰符       | 作用范围                                        |
| --------- | ------------------------------------------- |
| public    | 任何地方(实例、当前类、子类)都可见、公有的属性或方法，默认编写的属性就是public |
| private   | 仅在`同一类中可见`、`私有的属性或方法`                       |
| protected | 仅在**自身**和**子类中可见**、受保护的属性或方法                |
| readonly  | **只读属性**，不能修改                               |

## 类的存取器

使用 getter 和 setter 可以改变属性的赋值和读取行为，进行**拦截判断**

**常用于：私有属性暴露**

```js
class Person {
    //约定俗称的规范：私有属性前会加_
    private _name: string
    constructor(name: string) {
        this._name = name
    }
	//
    set name(newValue: string) {
        this._name = newValue
    }
    get name() {
        return this._name
    }
}

let p = new Person('zds')
console.log(p.name)
export {}
```

## 类的参数属性

> 它是一种语法题，即在`构造函数的参数前面添加修饰符`。它默认进行了两个操作，一个是定义其类型，另一个是添加上修饰符

```ts
class Person {
    age: number
    constructor(public name: string, age: number) {
        this.name = name
        this.age = age
    }
}
let p = new Person('zds', 12)
console.log(p.name)

export {}

```

**等同于**

```ts
class Person {
    name: string
    age: number
    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }
}
let p = new Person('zds', 12)
console.log(p.name)

export {}
```

## 抽象类 abstract（了解即可）

***

**什么是抽象方法？**

*   [ ] 抽象方法，必须`存在于抽象类中`
*   [ ] 抽象类是用`abstract声明的类`

**特点：抽象方法在抽象类中只有声明，没有实现体。子类必须实现抽象方法的实现体**

```ts
abstract class Shape {
    //抽象方法getArea只有声明，没有实现体
    //抽象方法必须放在抽象类中
    //特点：抽象方法的实现体，子类必须实现
    abstract getArea()
}

class Rectangle extends Shape {
    constructor(public width: number, public height: number) {
        super()
        this.width = width
        this.height = height
    }
    getArea() {
        return this.width * this.height
    }
}

class Circle extends Shape {
    constructor(public radius: number) {
        super()
        this.radius = radius
    }
    getArea() {
        return this.radius * this.radius
    }
}

function calcArea(shape: Shape) {}

```

## 抽象类和接口的区别(了解即可)

**相同点：**

*   都可以在其中定义方法，让子类或者实现类实现

**不同点**

*   抽象类中的方法称为抽象方法，**只有声明没有实现体**，需要在子类中实现。接口则可以用来描述对象或类的属性和行为
*   抽象类是由**子类继承**的，接口可以直接作为对象的类型注解，也可以由类来implement
*   `接口可以重复定义，实现该接口的时候必须符合所有接口特性`，抽象类和type都不可以重复定义

## TS中类型检测--鸭子类型

用ts的时候，会发现一种很奇怪的事情,明明函数参数要求传入的是Person类型，但是我直接传了一个相似对象，居然也不报错

![image-20230809160713104](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/09b7881cf53f472a8b5b9902981a734b~tplv-k3u1fbpfcp-zoom-1.image)

**原因：TS类型检测时，使用的是`鸭子类型`**。鸭子类型`只关心属性和行为`，不关心具体是不是那个类型。

如下：**getPerson只关心传入的参数对象有没有name属性，有没有age属性，如果传入的对象有对应属性，那就认为是`同一只鸭子`**。

![image-20230809161130238](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/54f10f01fdf84ea28629c638cb7c725e~tplv-k3u1fbpfcp-zoom-1.image)

![image-20230809161547795](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/98d0f4aa17694c7d9b5c78decca7d6f7~tplv-k3u1fbpfcp-zoom-1.image)

## 类实现接口

> 通过implements实现接口，使得类具有接口的相应特性。`创建出来的实例也会具有接口的所有特性`

```ts
interface IKun {
    name: string
    age: string
    slogan: string
    play: () => void
}

class Person implements IKun {
    constructor(public name: string, public age: string, public slogan: string) {}
    play() {}
}

let p = new Person('zds', '12', 'xx')
```

**注意：一个类可以实现多个接口，`该类需要实现所有接口的特性`**

```ts
interface IKun {
    name: string
    age: string
    slogan: string
    play: () => void
}

interface IRun {
    fly: string
    running: () => void
}

class Person implements IKun, IRun {
    fly: string
    constructor(public name: string, public age: string, public slogan: string, fly: string) {}
    play() {}
    running() {}
}

let p = new Person('zds', '12', 'xx', 'fly')
```

# TS扩展的类型

## any类型

（使用any并不可耻,但不要处处用❤❤❤❤❤）

**any类型是一种讨巧的TypeScript手段**，相当于回到了javascript

*   我们可以对`any类型的变量进行任何的操作`，包括`获取不存在的属性、方法`
*   我们也可以对一个`any类型的变量赋值任何的值、比如数字、字符串等等`

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

## unknown类型

**unknown是ts中特殊的一种类型，它用于描述类型不确定的变量**

*   [ ] 和any类型有点类似，但是`对unknown类型的值直接操作是非法`的，需要进行`类型缩小`！ （any类型是合法的）

![image-20230621151559970](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fdcbe7b6e117486fa80eb1c012044753~tplv-k3u1fbpfcp-zoom-1.image)![image-20230621151606572](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/df40ac4817fd48d19313d5cbcb2f14af~tplv-k3u1fbpfcp-zoom-1.image)

**因此，unknown类型默认情况下，进行任何操作都需要进行类型缩小,才能根据缩小后的类型，进行对应的操作**

```ts
let foo: unknown = 'aaa'
foo = 123

if(typeof foo==='string'){
    console.log(foo.length);
}
```

## void类型

**void通常用来指定一个函数是没有返回值的，所以它的返回值类型就是void**

**注意：如果返回值是void类型，ts编译器允许返回undefined (但实际上原则是错的，只不过undefined可以赋值给void类型)**

null不可以赋值给void类型

```ts
function fn(): void {
  return undefined
}
```

![image-20230621160555105转存失败，建议直接上传图片文件](C:\Users\01427334\AppData\Roaming\Typora\typora-user-images\image-20230621160555105.png)

## never类型

**never表示永远不会发生值的类型**

如果一个函数陷入了死循环或者抛出一个异常，那么返回类型就可以是never。

`实际开发中，只有进行类型推导会自动推导出never，很少直接使用它`

```ts
function foo(): never {
  throw '123'
}
foo()

```

## 联合类型

**联合类型表示`取值`可以为`多种类型中的一种`，使用 `|` 分隔每个类型。**

```ts
let num: string | number = 1
num = '123'
```

<a name='联合类型的问题'>**注意：当TypeScript不确定一个联合类型的变量到底是哪个类型的时候，`只能访问联合类型中所有类型的共有属性和方法`**</a>

![image-20230625153912596](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/754233fa277a47e09e9493d68968bae1~tplv-k3u1fbpfcp-zoom-1.image)

上例中，`length` 不是 `string` 和 `number` 的共有属性，所以会报错。

访问 `string` 和 `number` 的共有属性是没问题的：

```ts
function getString(something: string | number): string {
    return something.toString();
}
```

**最常见的：`获取DOM元素后，获取其属性`**

![image-20230807155941400](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1cbf67315a35432081bfea29a9c63e68~tplv-k3u1fbpfcp-zoom-1.image)

![image-20230807155959497](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3d2465c9c9614d4bb61e375b24728854~tplv-k3u1fbpfcp-zoom-1.image)

**联合类型的变量在被赋值的时候，会根据赋的值进行类型推导，`推导出变量的类型注解`**

```ts
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
console.log(myFavoriteNumber.length); // 5
myFavoriteNumber = 7;
console.log(myFavoriteNumber.length); // 编译时报错

```

## 交叉类型

**交叉类型表示 `多种类型同时满足`**

ts中不可能同时是number和string类型，因此返回never类型，无意义

![image-20230807154752285](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8ba5ef7d0ea9479080686389cb6eafac~tplv-k3u1fbpfcp-zoom-1.image)

交叉类型主要用于对象类型

```
interface IKun {
    name: string
    age: number
}
interface ICoder {
    name: string
    codeing: () => void
}

const info: IKun & ICoder = {
    name: 'zds',
    age: 18,
    codeing() {}
}

```

## **枚举类型**

**语法:**

```ts
enum Direction {
    UP,
    DOWN,
    LEFT,
    RIGHT
}

function turnDirection(direction: Direction) {
    switch (direction) {
        case Direction.LEFT:
            console.log('left')
            break
    }
}

turnDirection(Direction.UP)
```

**枚举类型的默认值**

枚举成员默认会`被赋值为从0开始递增的数字`

```ts
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};  0 1 2 3...
```

也可以手动赋值，**未手动赋值的枚举型会跟着上一个枚举的值递增**

    enum Days {Sun = 7, Mon = 1, Tue, Wed, Thu, Fri, Sat};  //Tue:2 Wed:3...

## type

> 通过`type`关键字给某些类型起一个别名，方便复用

```ts
type CoordinateType = {
    x: number
    y: number
    z?: number
}
function printCoordinate(point: CoordinateType) {}
printCoordinate({ x: 1, y: 2 })
```

## interface

<a name='接口'>接口</a>

在TypeScript中，我们常常使用`接口来定义对象的类型`,(当然type类型别名也可以)。

接口是以`声明的方式`定义的(如函数声明、类声明)，类型别名是以赋值的方式

```
interface PointType2 {
    x: number
    y: number
    z?: number
}

```

**赋值的时候，`变量的形状必须和接口的形状保持一致`**。

**可选属性?**

有时我们希望不要完全匹配一个形状，那么可以用可选属性：

```ts
interface Person {
    name: string;
    age?: number;
}

let tom: Person = {
    name: 'Tom'
};
let tom: Person = {
    name: 'Tom',
    age: 25
};
```

这时**仍然`不允许添加未定义的属性`**：

**任意属性**

有时候，我们希望一个接口允许有任意的属性(定义api接口返回数据的类型)

```js
interface Person{
	name:string,
	[propName:string]:any
}
```

**注意**：

使用 `[propName: string]` 定义了任意属性取 `string` 类型的值。

需要注意的是，**一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集**：

```js
interface Person {
    name: string;
    age?: number;
    [propName: string]: string;
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};
// index.ts(3,5): error TS2411: Property 'age' of type 'number' is not assignable to string index type 'string'.
// index.ts(7,5): error TS2322: Type '{ [x: string]: string | number; name: string; age: number; gender: string; }' is not assignable to type 'Person'.
//   Index signatures are incompatible.
//     Type 'string | number' is not assignable to type 'string'.

```

上例中，任意属性的值允许是 `string`，但是可选属性 `age` 的值却是 `number`，`number` 不是 `string` 的子属性，所以报错了。

一个接口中只能定义一个**任意属性**。如果接口中有多个类型的属性，则可以在**任意属性中使用联合类型**：

```ts
interface Person {
    name: string;
    age?: number;
    [propName: string]: string | number;
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};
```

**只读属性**

有时候我们希望对象中的一些字段只能在创建的时候被赋值，那么可以用 `readonly` 定义只读属性：

```ts
interface Person {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    id: 89757,
    name: 'Tom',
    gender: 'male'
};

tom.id = 9527;

// index.ts(14,5): error TS2540: Cannot assign to 'id' because it is a constant or a read-only property.
```

上例中，使用 `readonly` 定义的属性 `id` 初始化后，又被赋值了，所以报错了。

**注意，只读的约束存在于`第一次给对象赋值`的时候，而不是第一次给只读属性赋值的时候**：

```ts
interface Person {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    name: 'Tom',
    gender: 'male'
};

tom.id = 89757;

// index.ts(8,5): error TS2322: Type '{ name: string; gender: string; }' is not assignable to type 'Person'.
//   Property 'id' is missing in type '{ name: string; gender: string; }'.
// index.ts(13,5): error TS2540: Cannot assign to 'id' because it is a constant or a read-only property.
```

上例中，报错信息有两处，第一处是在对 `tom` 进行赋值的时候，没有给 `id` 赋值。

第二处是在给 `tom.id` 赋值的时候，由于它是只读属性，所以报错了。

**接口的继承特性**

> 可以从别的接口继承相关属性类型

**作用：**

*   **减少相同代码重复编写**
*   **如果使用第三方库，第三方库定义了对应类型，我们希望能添加一些额外类型，就可以用接口继承**

```ts
interface IPerson {
    name: string
    age: number
}

interface IKun extends IPerson {
    slogan: string
}

const ikun: IKun = {
    name: 'why',
    age: 12,
    slogan: '13'
}

```

## type和interface的区别

相同点：`类型别名和接口非常相似`，在**定义对象类型**时，`大部分情况下，用法相同`

不同点：

*   **type可以用来声明基本类型、联合类型、交叉类型，`接口只能用来声明对象的类型`**

*   **声明对象时，type不可以重复声明对应的类型别名，`interface可以多次重复声明且多次声明都有效，必须同时满足` （而且后序属性声明必须属于同一类型，比如第一个interface{x:number},第二个{x:string}会报错）**

*   **interface支持继承，也可以被类实现implements**

> 总结：type的范围更广，可以声明基本类型也可以声明对象类型。interface虽然只能声明对象类型，但是它有很多及其好用的特性。比如重复声明需同时满足，比如继承等。`如果定义非对象类型(联合类型，交叉类型)，用type，定义对象类型用interface`

![image-20230807153218354](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3a4f408e9f034723a68f3fb3bec1ef3d~tplv-k3u1fbpfcp-zoom-1.image)

![image-20230807153340452](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/56c49b193457430c8f1b22d300554b9c~tplv-k3u1fbpfcp-zoom-1.image)

![image-20230807153513128](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0a5451d634b74e1f8fa013a844218581~tplv-k3u1fbpfcp-zoom-1.image)

## 类型断言 as

**类型断言可以用来手动指定一个值的类型**

语法： `值 as 类型`

### **类型断言的用途**

#### 断言具体类型

*   [ ] 比如，我们通过document.getElementById,ts只知道**该函数会返回HTMLElement**，`并不知道它具体的类型`，这时候就可以使用类型断言。

    `要求：必须当前元素存在，且明确它的类型`。

    因为类型断言只能够「欺骗」TypeScript 编译器，无法避免运行时的错误，反而滥用类型断言可能会导致运行时错误

    [错误案例](#类型断言)

    ```ts
    //确定当前元素存在同时确定它的类型
    const imgUrl = document.querySelector('.img') as HTMLImageElement
    console.log(imgUrl.src)
    ```

#### 将一个联合类型断言为其中一个类型

[之前提到过](http://ts.xcatliu.com/basics/union-types.html#访问联合类型的属性或方法)，当 `TypeScript 不确定一个联合类型的变量到底是哪个类型`的时候，我们**只能访问此联合类型的所`有类型中共有的属性或方法`**：

```ts
interface Cat {
    name: string;
    run(): void;
}
interface Fish {
    name: string;
    swim(): void;
}

function getName(animal: Cat | Fish) {
    return animal.name;
}
```

而有时候，我们确实需要在还不确定类型的时候就访问其中一个类型特有的属性或方法，比如：

```ts
interface Cat {
    name: string;
    run(): void;
}
interface Fish {
    name: string;
    swim(): void;
}

function isFish(animal: Cat | Fish) {
    if (typeof animal.swim === 'function') {
        return true;
    }
    return false;
}

// index.ts:11:23 - error TS2339: Property 'swim' does not exist on type 'Cat | Fish'.
//   Property 'swim' does not exist on type 'Cat'.
```

这样就可以解决访问 `animal.swim` 时报错的问题了。

<a name='类型断言'>滥用类型断言案例：</a>

```ts
interface Cat {
    name: string;
    run(): void;
}
interface Fish {
    name: string;
    swim(): void;
}

function swim(animal: Cat | Fish) {
    (animal as Fish).swim();
}

const tom: Cat = {
    name: 'Tom',
    run() { console.log('run') }
};
swim(tom);
// Uncaught TypeError: animal.swim is not a function`
```

上面的例子编译时不会报错，但在运行时会报错：

```autoit
Uncaught TypeError: animal.swim is not a function`
```

原因是 `(animal as Fish).swim()` 这段代码隐藏了 `animal` 可能为 `Cat` 的情况，将 `animal` 直接断言为 `Fish` 了，而 TypeScript 编译器信任了我们的断言，故在调用 `swim()` 时没有编译错误。

可是 `swim` 函数接受的参数是 `Cat | Fish`，一旦传入的参数是 `Cat` 类型的变量，由于 `Cat` 上没有 `swim` 方法，就会导致运行时错误了。

总之，使用类型断言时一定要格外小心，尽量避免断言后调用方法或引用深层属性，以减少不必要的运行时错误。

#### 将任何一个类型断言为any (不要乱用)

当我们引用一个在此类型上不存在的属性或方法时，就会报错：

```ts
const foo: number = 1;
foo.length = 1;
// index.ts:2:5 - error TS2339: Property 'length' does not exist on type 'number'.
```

但有的时候，我们非常确定这段代码不会出错，比如下面这个例子：

```ts
window.foo = 1;

// index.ts:1:8 - error TS2339: Property 'foo' does not exist on type 'Window & typeof globalThis'.
```

上面的例子中，我们需要将 `window` 上添加一个属性 `foo`，但 TypeScript 编译时会报错，提示我们 `window` 上不存在 `foo` 属性。

此时我们可以使用 `as any` 临时将 `window` 断言为 `any` 类型：

```ts
(window as any).foo = 1;
```

在 `any` 类型的变量上，访问任何属性都是允许的。

需要注意的是，将一个变量断言为 `any` 可以说是解决 TypeScript 中类型问题的**最后一个手段**。

#### 将 `any` 断言为一个具体的类型

举例来说，历史遗留的代码中有个 `getCacheData`，它的返回值是 `any`：

```ts
function getCacheData(key: string): any {
    return (window as any).cache[key];
}
```

那么我们在使用它时，最好能够将调用了它之后的返回值断言成一个精确的类型，这样就方便了后续的操作：

```ts
function getCacheData(key: string): any {
    return (window as any).cache[key];
}

interface Cat {
    name: string;
    run(): void;
}

const tom = getCacheData('tom') as Cat;
tom.run();
```

上面的例子中，我们调用完 `getCacheData` 之后，立即将它断言为 `Cat` 类型。这样的话明确了 `tom` 的类型，后续对 `tom` 的访问时就有了代码补全，提高了代码的可维护性。

总结：类型断言的作用：

*   将一个联合类型断言为其中的一个类型
*   父类断言为子类
*   任何类型可以被断言为any
*   any可以被断言为具体的类型

类型断言只能用来**欺骗TypeScript的编译器**，它并**不会影响到变量**真正的类型

## 非空类型断言 !

**？ 可选链：属性读取，如果为空，直接返回 `undefined`**

```ts
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

```

**但是属性赋值是不能用可选链**

![image-20230807171228511](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fee204ab01e441279ce89fc230175ba1~tplv-k3u1fbpfcp-zoom-1.image)

**解决措施**

*   类型缩小

        if (p1.friend) {
            p1.friend.name = 'zds'
        }

*   非空断言!

    ```ts
    // 强制告诉ts编译器不为空,但只是欺骗编译器，如果它还是空的话会报错
    p1.friend!.name = 'zds'
    ```

    **只有我们`确定传入的参数是有值的`，我们才能用非空类型断言，它`只是跳过ts在编译阶段对它的检测`**。**所以最好还是用类型缩小**

## 字面量类型

### 使用

**let n: 'POST' = 'POST'**

> 将一个值作为其类型，之后该变量赋值也只能是对应的值

`作用`：**配合 | 联合类型 将多个字面量类型联合起来。**

```ts
常见使用 定义方法类型是字面量类型
type DirectionType = 'left' | 'right' | 'top' | 'bottom'
type RequestMethod = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'get'
const d1: DirectionType = 'left'

function request(url: string, method: RequestMethod) {}

request('http://cs', 'DELETE')
```

**一个细节问题**

    const testInfo = {
        url: 'xxx',
        method: 'post'
    }
    request(testInfo.url, testInfo.method) //会报错

![image-20230807174538978](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/533e48bf38dc481cb6729b8b6b0e519d~tplv-k3u1fbpfcp-zoom-1.image)

**因为testInfo.method类型是string类型**

解决办法：

*   **request(testInfo.url, testInfo.method as “POST”)**  类型断言，断言它是\*\*“POST”字面量类型\*\*
*   **testInfo添加类型注解**

```ts
const testInfo: { url: string; method: RequestMethod } = {
    url: 'xxx',
    method: 'POST'
}
```

**`字面量类型特殊写法`**  **将值变为可读，且类型是字面量**

```ts
const info2 = {
    name: '1',
    url: '12'
} as const
```

![image-20230807175027200](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8eeaaadd05e6415fb172d003fd7bbb50~tplv-k3u1fbpfcp-zoom-1.image)

### 严格的字面量赋值检测:imp:

**对于TS的字面量赋值，TS有一个很奇怪的现象：**

如果`对象字面量赋值`中的属性不在接口中出现会报错，这个很正常

![image-20230809172728020](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8d2d7eb081db41c7a8a52ba7e8f4b0ce~tplv-k3u1fbpfcp-zoom-1.image)   <a name='fresh'>新鲜</a>![image-20230809172759169](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1b2b67d9239149b19df9a2ad46b3b72a~tplv-k3u1fbpfcp-zoom-1.image)

\*\*但是，如果用一个变量暂存，它就不报错了 \*\*<a name='扩散'>对象字面量被扩散到变量p上</a>

![image-20230809172840145](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ecf73ec8104044a288932ba86684c497~tplv-k3u1fbpfcp-zoom-1.image)

**解释：**

> 第一次创建的对象字面量，称之为fresh([新鲜的](#fresh))，`对于新鲜的字面量，会进行严格的类型检测`，必须`完全满足类型的要求`(不能多或少于接口属性)

> 当类型断言或当 [对象字面量扩散](#扩散) 的时候 ，就不进行严格检测，新鲜度消失。**但是得注意，如果想要获取对应的值(但是接口里没有定义)，ts还是会报错的**
>
> ![image-20230809173901878](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/612ba03d5c1e492896265dfd998887f5~tplv-k3u1fbpfcp-zoom-1.image)

## 类型缩小

> 在给定的执行路径中，我们可以 `将类型缩小成比声明更小的类型`，这个过程称为类型缩小，而进行判断的称为类型保护

常见的类型保护有 typeof  instanceof  ===

使用场景：**[注意：当TypeScript不确定一个联合类型的变量到底是哪个类型的时候，`只能访问联合类型中所有类型的共有属性和方法`](#联合类型的问题)**

![image-20230807175909935](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/95b5fd649283408fbae35affe042d96a~tplv-k3u1fbpfcp-zoom-1.image)

解决方案：

​		①类型断言 as ，但是**断言只是欺骗ts编译器**，让其编译过程中不报错，但允许过程中如果传入number会报错。

所以使用类型断言的前提，必须确定传入的值类型且非空

​		②typeof 类型缩小

```ts
function printId(id: string | number) {
    if (typeof id == 'string') {
        console.log(id.length)
    }
}

```

## 索引签名

即**任意属性**

有时候我们希望一个接口允许有任意的属性，可以使用如下方式：

```ts
interface Person {
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    name: 'Tom',
    gender: 'male'
};
```

使用 `[propName: string]` 定义了任意属性取 `string` 类型的值。

需要注意的是，**一旦定义了任意属性，那么`确定属性和可选属性的类型都必须是它的类型的子集`**

**注意点：在js中，对象\[变量]无论传入什么，最后都会被转化为字符串**

![image-20230809174639618](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ac97e93d6b2341b49c4daae1ccc4e799~tplv-k3u1fbpfcp-zoom-1.image)![image-20230809174645624](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/32896cd3776e446999f5d6dbbc160638~tplv-k3u1fbpfcp-zoom-1.image)

**而在ts中，索引签名只能是`number|string`**

```ts
interface IIndexType {
    [aaa: number | string]: any  //所以只需要[propName:string]:any即可
}

let nums: IIndexType = ['abc', 'bac', 'cab']
console.log(nums['0'])
console.log(nums[0])

```

![image-20230810144144320](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f752dca38f40464084d53ee32ce2af7b~tplv-k3u1fbpfcp-zoom-1.image)

如果分别定义了两个索引签名(),**注意数字类型的索引签名必须是字符串类型的子集**

![image-20230810144256012](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/74cf951681a742d6b2cb63a20e067add~tplv-k3u1fbpfcp-zoom-1.image) ![image-20230810144304579](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5466662680c54b65b4842679c7b129da~tplv-k3u1fbpfcp-zoom-1.image)

# 泛型

为什么要有泛型？

开发的主要目的之一是写出具有很强复用性的代码。比如封装了防抖等等工具函数

## **作用和语法**

`类型参数化，即将参数的类型也变为一个参数使用`

> 例如我想实现一个传入什么类型，返回值就什么类型的函数，可以用函数重载实现，但是每次多个类型都要写个重载签名，太麻烦了
>
> ![ ](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/de5c02c65d40468d8ad9f4f42ab2630c~tplv-k3u1fbpfcp-zoom-1.image)

而泛型就可以轻松的实现`类型参数化`。

```ts
function bar<T>(n: T): T {
    return n
}

bar<number>(1)
bar<string>('1')

```

**使用函数类型表达式**

```ts
export const getName = <T>(name: T): T => {
    return name
}
```

**注意：如果函数中要写对应的泛型参数，那么`不能通过type的方式定义函数类型`，只能在声明时定义。即以上两种方式。而且也确实没必要额外声明函数类型**

![image-20230811152745169](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2ba708a0f98347e4bba8bf59fa331771~tplv-k3u1fbpfcp-zoom-1.image)

## 泛型接口和泛型类

**泛型接口：**

```ts
interface IKun<Type> {
    name: Type
    age: Type
    slogan: string
}

const kunkun: IKun<string> = {
    name: '1',
    age: '123',
    slogan: '123'
}

```

**泛型接口还可以含有`默认值`，有默认值就无需指定泛型接口的参数了**

![image-20230810154350394](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ea2fbbe7f6224d33b8b39e85e990373f~tplv-k3u1fbpfcp-zoom-1.image)

**泛型类：**

```ts
class Point<Type = string> {
    x: Type
    y: Type
    constructor(x: Type, y: Type) {
        this.x = x
        this.y = y
    }
}
const p1 = new Point<number>(1, 2)
const p2 = new Point('3', '4')

```

## 泛型约束

`泛型约束：传入的类型必须要有这个属性，也可以有其他属性，但是必须至少有这个成员!`

**泛型约束使用**

*   [ ] 有时候，我们希望传入的类型有某些共性，但是这些共性不是在同一种类型中

*   [ ] 比如string和array都有length，或者某些对象也是有length

    那么**要求拥有length的属性都可以作为我们的参数类型**

    > 最初，将Ilength类型赋值给参数，但这会导致两个问题，一个是返回的a、b会丢失类型，他们不再是原始的number\[]，而都变成了ILength类型。其次，要求是对象含有length属性，而不是对象只能有length属性

    ![image-20230810160002407](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3022f12f84dc4b428eef6e0daccb9a42~tplv-k3u1fbpfcp-zoom-1.image)

**泛型约束写法**

`Type相当于一个变量，用于记录本次调用时传入的类型，所以在整个函数的执行期间，一直保留着对应的类型`

![image-20230810160152866](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6d3a700464e74d59a22a8c6aeb6e24c3~tplv-k3u1fbpfcp-zoom-1.image)

`泛型约束：传入的类型必须要有这个属性，也可以有其他属性，但是必须至少有这个成员!`

**案例2：传入一个对象和key，并定义相应类型**

*   首先，可以**声明一个类型参数**，这个类型参数被其他类型参数约束

```ts
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
```

# 映射类型

> 使用场景：一个类型需要基于另一个类型，但是又不想直接复制粘贴一份，就可以使用映射类型

*   **映射类型建立在索引签名的语法上**

*   **映射类型本质上是`使用了propertyKeys联合类型的泛型`**

*   **其中propertyKeys通过keyof创建，然后通过in循环遍历创建对应键名的类型**

    ```ts
    type MapPerson<Type> = {
        [Property in keyof Type]: Type[Property]
    }
    
    interface IPerson {
        name: string
        age: number
    }
    
    type MyPerson = MapPerson<IPerson>
    
    export {}
    ```

# TS扩展知识

## TS模块化

**js中两种模块化方式**

**①commonJS 通过`require`导入，`module.exports`导出**

**②es6的module import导入export导出,TS中最主要使用的就是`ES Module`(虽然也支持commonjs,但是推荐ES Module)**

区别：

*   CommonJS 是同步加载模块的，即在运行时按需加载模块。ES6 是异步加载模块的，即在编译时静态解析模块的依赖关系，并在运行时动态加载和执行模块。
*   CommonJS 在导入模块时，会将整个模块的值复制并分配给变量，因此导入的是值的拷贝。ES6 模块在导入时，是动态地绑定到导出的模块，导入的是模块的引用。

**在TypeScript中最主要使用的`模块化方案就是ES Module`**

  **我们需要理解TS中认为什么是一个模块**

   -   在js中，`没有export的js文件都被认为是一个脚本。`
   -   在脚本文件中，`变量和类型会被声明在共享的全局作用域`。(就会导致变量名冲突)


**TS也是如此！！！**
    
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/17a53518d3454fd682ddc6727667d238~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=880&h=443&s=123442&e=png&b=242425)
    
    


如果希望某个文件作为模块处理，只需要添加 `export {}`，这会把文件改成一个`没有导出任何内容`的`模块`。`但是该模块就会有自己的局部作用域，不会和别的模块产生冲突`
    
> 直接声明一个index.d.ts文件，且没有`export {}`,说明该文件是全局的，因此外界可以直接调用，ts编译器不会报错。但也因此会导致大量的全局变量名冲突。过去的解决方案是声明namespace，但随着es module的出现，就不需要了


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/437c37727be444928c557603b38e412f~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=280&h=94&s=13579&e=png&b=1f1f1f)
    
**TS模块中类型的导入**

```ts
//一般ts文件中，如果导入的是类型，推荐在类型前面加上一个type，表明导入的是一个类型
import type { IPerson } from './type'
const p: IPerson = {
    name: 'zds',
    age: 12
}
```

**添加type的作用：可以让非TS编译器知道(如babel)，`什么样的导入是可以安全移除的`。因为ts代码最后都是要被编译成js代码的，`TS的作用是让错误在编译时发现，不要在运行时出现`**    


## 类型的查找

**之前我们用的TS类型，都是我们自己定义的，但是我们也会用到一些其他类型，如**

```ts
const imgEL=document.querySelector('.img') as HTMLImageElement;
```

**这个HTMLImageElement类型来自哪里？这就 `涉及到ts对类型的管理和查找规则`**

### .d.ts文件

-   我们之前编写的.ts文件，这些都会被输出为.js文件
-   但是还有一种特殊的.d.ts文件，他是**用来做类型的声明**， 称为`类型声明文件`
-   它**只是用来做类型检测**，告知ts编译器我们有哪些类型

**.d.ts文件中，一般自定义时不会将该文件作为一个模块,即不会export导出，那么`定义的类型默认写在全局里面`，外界可以直接使用**

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7c7ef531200a463d8ae17a85f3d9e865~tplv-k3u1fbpfcp-zoom-1.image) ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2dbbee4e21c34430af58cd83beca2ee5~tplv-k3u1fbpfcp-zoom-1.image)

在一个项目当中，有以下类型声明文件：

#### `内置类型声明`

**在lib.d.ts文件中可以看到，它们都是没有导出的，直接声明在全局作用域的**

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/245cf51fe963459d88818f635383a13e~tplv-k3u1fbpfcp-zoom-1.image)

#### `外部定义类型声明`(第三方库)

**通常是我们使用时，需要用的一些类型声明**，**一般第三方库有两种类型声明方式：**

-   在 `自己库中进行类型声明，编写(.d.ts)文件，如axios库`，**可以直接导入**

    ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/99932dd73e9541a18ea6c7dd840164c1~tplv-k3u1fbpfcp-zoom-1.image)

    ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ec5d2ccb3de940b7b3cbc93ba78b0e84~tplv-k3u1fbpfcp-zoom-1.image)

-   也有一些包，**本身没有自带index.d.ts包，如react**。 但是**可以通过社区的公有库下载类型声明文件**。

    ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e8bba368a71d402da101778ee71bcacd~tplv-k3u1fbpfcp-zoom-1.image)

#### `自己定义类型声明文件`

**如果，@types这个库里没有对应的外部类型声明文件，你就只能自己声明**

```ts
declare module 'lodash'   //通过declare直接声明module在全局作用域里是个模块
​
//使用
import _ from 'lodash'
_.join([a,b])  //但其实_类似于any类型，想对其进行任何操作都是可以的，也没有代码提示
```

```ts
//稍微详细点
declare module 'lodash' {
    export function join(...args: any[]): any
}
​
```

-   **什么情况下需要自己来定义声明文件呢？**

1.  我们使用的`第三方库是一个纯的js库`，`没有index.d.ts`类型声明文件
1.  给自己的代码中声明一些类型，方便在`其他地方直接调用`

#### declare

**declare作用：**

-   `声明全局变量`。`declare` 可以用于在类型声明文件中声明全局变量的存在，以便在 TypeScript 代码中使用这些变量而不会引发编译错误

    ```ts
    // global.d.ts
    declare const myGlobalVariable: string;
    ​
    // app.ts
    console.log(myGlobalVariable); // TypeScript 不会报错，因为该变量已经通过声明存在的方式告诉了编译器
    ​
    ```

-   `声明全局类型`。`declare` 可以用于在类型声明文件中`声明全局类型`，以提供类型信息并启用类型检查。例如：

    ```ts
    //global.d.ts
    declare type whyName = string
    ```

    这样外界可以直接使用该类型

    ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/08a88511fef146e5933995f617405a97~tplv-k3u1fbpfcp-zoom-1.image)

<!---->

-   可以用来声明模块，比如lodash模块默认没有index.d.ts类型声明文件，会报错，我们就需要自己声明该模块

    `声明模块的语法`

    ```
    declare module '模块名' {
        export function():any
    }
    ```

    在`声明模块的内部`，我们可以通过`export导出对应库的类`、`函数`等

<!---->

-   可以**用来声明文件**，比如.png|.jpg。只有声明以后，png等文件才能被当做模块进行导入

    ```ts
    declare module '*.png' {
        const src: string
        export default src
    }
    ​
    declare module '*.jpg'
    ​
    ```







### 映射类型修饰符

在使用映射类型时，有两个额外的修饰符可能会用到：

-   一个是readonly，用于设置属性只读
-   一个是 ? ,用于设置属性可选

还可以通过 - 或者 + 来实现修饰符的添加删除，如果没有写前缀，默认是 +
    ![image-20230810163352623](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a9749d0be1b34fde84b44abd7a9156e5~tplv-k3u1fbpfcp-zoom-1.image)
    
 # tsconfig.json

**注意：如果当前目录下出现了tsconfig.json文件，说明该目录是TS项目的`根目录`**

作用：

-   **指定了需要ts编译的文件和编译选项，让TS在编译时知道如何去编译TS代码和进行类型检测。**
-   **让编辑器可以按照正确方式识别TS代码，对哪些语法进行提示，哪些进行报错**

jsconfig.json：也是让编译器知道编译js代码时，哪些需要提示(路径跳转)，哪些需要进行报错

## 常见配置项

-   **顶层配置**

| 属性              | 值   | 作用                                                                                      |
| --------------- | --- | --------------------------------------------------------------------------------------- |
| compilerOptions |     | 后续详解                                                                                    |
| files           |     | 编写一个数组，用于指定项目中包括哪些文件 通常当项目中文件较少时，可以使用，一般不需要配置                                           |
| include         | [ ] | 如果不指定include，那么默认会把项目下的所有ts文件进行编译。 指定includes:['src/ ***/* *.ts']，那么会编译src下所有`子目录的ts文件` |
| exclude         | []  | 不需要编译的文件                                                                                |

-   "**compilerOptions**":

    | 属性                           | 值               | 作用                                                                                                                    |
    | ---------------------------- | --------------- | --------------------------------------------------------------------------------------------------------------------- |
    | target                       | esnext          | 将ts代码更新为最新的es13代码，但是最终还是会通过babel进行转化                                                                                  |
    | module                       | ESNext、CommonJS | `生成的代码`采用的`模块化`方式，但是最后还是会通过babel进行转化                                                                                  |
    | strict                       | boolean         | TS中的严格模式：允不允许使用模糊的any                                                                                                 |
    | allowJs                      | boolean         | 是否允许使用js代码                                                                                                            |
    | jsx                          | preserve        | 对于jsx代码进行保留，不需要tsc进行编译，babel会对其进行转换                                                                                   |
    | importHelpers                | boolean         | TS中有个包tslib,类似于babel中的polyfill。(当前环境不支持某个高级api，进行打补丁，从而使用高级特性)                                                        |
    | moduleResolution             | "node"          | 引入模块时使用什么算法来查找路径，用node即可                                                                                              |
    | skipLibCheck                 | boolean         | 跳过对整个库的类型监测， 仅仅监测自己使用到的类型（很少用）                                                                                        |
    | esModuleInterop              | boolean         | 可以让esmodule和commonjs互相调用，即用**import导入commonjs中module.exports导出的代码**                                                   |
    | allowSyntheticDefaultImports | boolean         | (不要用) 比如：export {aa,bb} ,导入 import {aa,bb} from 或者是import * as x from 不能直接import xx from xx，打开的话就可以它等同于import * as xx |
    | path                         | {'@':['src/*']} | 配置路径别名提示                                                                                                              |
    | lib                          | 一般不配置           | 指定我们需要使用的库                                                                                                            |

[tsconfig.json详细配置](https://juejin.cn/post/7259715842873655333?searchId=20231101141850D6E1973B1F490153B50A#heading-0)
    
    
    
 # TS关键字

## keyof

```
keyof T  //获取属性名的联合类型
```

`作用：获取类型T上所有公共属性名的联合类型`

```
interface Eg1 {
  name: string,
  readonly age: number,
}
// T1的类型实则是name | age
type T1 = keyof Eg1
​
class Eg2 {
  private name: string;
  public readonly age: number;
  protected home: string;
}
// T2实则被约束为 age
// 而name和home不是公有属性，所以不能被keyof获取到
type T2 = keyof Eg2
​
```

## T[k]

`索引查询`

**作用：根据接口(对象类型)中的key，获取`属性值的类型`**

**type V3 = Eg1[keyof Eg1]** 🔥🔥🔥

```
interface Eg1 {
  name: string,
  readonly age: number,
}
// string
type V1 = Eg1['name']
// string | number
type V2 = Eg1['name' | 'age']
// any
type V2 = Eg1['name' | 'age2222']
// string | number
type v2 = Eg1[keyof Eg1]
​
```

**注意：如果多个score:number,最后依然返回string|number。因为相同类型的会被合并，never会被去除**

```
type People = {
    name: string
    age: number
    score: never
}
type keys = keyof People
type values = People[keys]  //结果为 string|number
```

## extends

-   用于接口，表示接口的继承

    ```
    interface T1 {
      name: string,
    }
    ​
    interface T2 {
      sex: number,
    }
    ​
    /**
     * @example
     * T3 = {name: string, sex: number, age: number}
     */
    interface T3 extends T1, T2 {
      age: number,
    }
    ​
    //T3接口必须同时满足T1和T2
    let t:T3 = {
        name:'1',
        sex:1,
        age:1
    }
    ​
    ```

<!---->

-   **表示条件类型，用于条件判断**

表示条件判断，如果前面的条件满足，则返回问号后的第一个参数，否则第二个。类似于js的三元运算。

```
/**
 * @example
 * type A1 = 1
 */
type A1 = 'x' extends 'x' ? 1 : 2;
​
/**
 * @example
 * type A2 = 2
 */
type A2 = 'x' | 'y' extends 'x' ? 1 : 2;
​
/**
 * @example
 * type A3 = 1 | 2
 */
type P<T> = T extends 'x' ? 1 : 2;
type A3 = P<'x' | 'y'>
​
```

**注意：**

-   如果用于简单的条件判断，则是直接判断前面的类型是否可分配给后面的类型
-   若`extends`前面的类型是泛型，且泛型传入的是联合类型时，则会依次判断该联合类型的所有子类型是否可分配给extends后面的类型（是一个分发的过程）。

**总结，就是`extends`前面的参数为`泛型`时，且`泛型为联合类型时`，则会分解（依次遍历所有的子类型进行条件判断）联合类型进行判断。然后将最终的结果组成新的联合类型。**

**如果不是泛型，前面直接是联合类型，那么也是直接判断前面类型是否可分配给后面类型**。如A2，自然是false，返回类型2

* * *

**阻止extends关键字对于`泛型传入联合类型`的分发**

```
type P<T> = [T] extends ['x'] ? 1 : 2;
/**
 * type A4 = 2;
 */
type A4 = P<'x' | 'y'>
​
```

* * *

## infer

在**条件类型中使用**，可以从正在`比较的类型`中推断类型，然后在`true分支`里引用该`推断结果`

# 类型兼容性

> 集合论中，如果一个集合的所有元素在集合B中都存在，则A是B的子集；
>
> 类型系统中，如果一个**类型的属性更具体**，则该类型是子类型。（因为属性更少则说明该类型约束的更宽泛，是父类型）

**因此，我们可以得出基本的结论：子类型比父类型更加具体,父类型比子类型更宽泛**

`因此，子类型可以赋值给父类型，但是父类型不能赋值给子类`

# TS内置类型工具

## partial

`Parital<T>`：**传入一个对象类型，返回一个新类型，新类型中其所有属性变为可选**

```
/**
 * 核心实现就是通过映射类型遍历T上所有的属性，
 * 然后将每个属性设置为可选属性
 */
type Partial<T> = {
  [P in keyof T]?: T[P];
}
```

扩展一下，可以指定**哪几个属性变为可选**

```
//扩展一下，将传入的属性变为可选 ,K是联合类型,属于T的键名组成的联合类型
type PartialOptional<T, K extends keyof T> = {
    [p in K]?: T[p]
}
type Eg1 = PartialOptional<{ key1: string; key2: number; key3: number }, 'key1' | 'key2'>
//Eg1 {key1?:string,key2?:string}
```

```
type PartialOptional<T, K extends keyof T> = Partial<Pick<T, K>>
```

## Readonly

`Readonly<T>`:**传入一个对象类型，返回一个新的类型，该类型中所有属性变为可读**

使用：

```
type Person = {
    name: string
    age: number
}
​
type p = Readonly<Person>
​
```

自实现

```
type MyReadonly<T> = {
    readonly [k in keyof T]: T[k]
}
​
type p2 = MyReadonly<Person>
​
type ReadonlyOptional<T, K extends keyof T> = {
    readonly [P in K]: T[P]
}
​
type p3 = ReadonlyOptional<Person, 'name'>
​
```

## Pick

`Pick<T,K extends keyof T>`：**传入一个类型和其key，返回一个新的对象类型**

```
type Person = {
    name: string
    age: number
}
type p1 = Pick<Person, 'age'>
​
```

自实现：遍历联合类型K中的key,返回一个新的类型

```
type MyPick<T, K extends keyof T> = {
    [P in K]: T[P]
}
```

## Record

构造一个`type`，`key`为联合类型中的每个子类型，类型为`T`。文字不好理解，先看例子：

```
/**
 * @example
 * type Eg1 = {
 *   a: { key1: string; };
 *   b: { key1: string; };
 * }
 * @desc 就是遍历第一个参数'a' | 'b'的每个子类型，然后将值设置为第二参数
 */
type Eg1 = Record<'a' | 'b', {key1: string}>
```

**自实现：**

```
type MyRecord<K extends string | number | symbol, T> = {
    [P in K]: T
}
```

## Exclude

`Exclude<T, U>`提取存在于`T`类型，但不存在于`U`的类型组成的联合类型。 一般来说T泛型是对象key名组成的联合类型

**Exclude<keyof T>**

```
/**
 * 遍历T中的所有子类型，如果该子类型约束于U（存在于U、兼容于U），
 * 则返回never类型，否则返回该子类型
 */
type Exclude<T, U> = T extends U ? never : T;
​
/**
 * @example
 * type Eg = 'key1'
 */
type Eg = Exclude<'key1' | 'key2', 'key2'>
​
type Person = {
    name: string
    age: number
    score:number
}
​
//存在于T但不存在于K
type A = Exclude<keyof Person, 'name'> //结果A： "age"|"score"
export {}
​
```

## Extract

`Extract<T, U>`提取联合类型T和联合类型U的所有交集。

**Extract用的就是extends条件判断传入泛型的情况。如果extends作为条件判断，左边是一个联合类型，那么它会遍历子类型，判断是否属于右边类型，如果属于，最后会拼接成一个满足条件的联合类型返回**

```
type MyExtract<T, U> = T extends U ? T : never
​
type A = MyExtract<string | number, number | string>  //结果 number|string
```

## Omit

`Omit<T, K>`从类型`T`(**因此，T是对象类型**)中剔除`K`(**K是联合类型**)中的所有属性,最后**返回一个新的对象类型**

```
type Person = {
    name: string
    age: number
}
type A = Omit<Person, 'name'>
​
```

**自实现：**

```
//参数T对应的类型，K需要去除的属性
type MyOmit<T, K extends keyof T> = {
    //Exclude<T,K> 即存在于T，不存在K所组成的类型。因为一般会传入联合类型，它的本质是extends，它会遍历联合类型的子类型，分别判断其是否存在于K中。
    [P in Exclude<keyof T, K>]: T[P]  //传入T的属性所构成的联合类型，不存在于K的类型(即去除了K)
}
type A = MyOmit<{ name: string; age: number }, 'name'>
​
```

* * *

**取巧，利用Pick实现**

`Omit<T, K>`从类型`T`中剔除`K`中的所有属性。

```
typescript复制代码/**
 * 利用Pick实现Omit
 */
type Omit = Pick<T, Exclude<keyof T, K>>;
```

-   换种思路想一下，其实现可以是利用`Pick`提取我们需要的keys组成的类型
-   因此也就是 `Omit = Pick<T, 我们需要的属性联合>`
-   而我们需要的属性联合就是，从T的属性联合中排出存在于联合类型K中的
-   因此也就是`Exclude<keyof T, K>`

## Optional

**T：传入的对象类型，K对应的键名构成的联合类型，将其变为可选**

```ts
type Optional<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>
​
type Person = {
    name: string
    age: number
}
​
type A = Optional<Person, 'name'>
```

如果没有Omit的话，那么age属性就会被去除掉

**写法②**

```
type Optional2<T, K extends keyof T> = {
    [P in K]?: T[P]
} & Omit<T, K>
type B = Optional2<Person, 'age'>
​
//再抽象点，把Omit写成原生的
type Optional2<T,K extends keyof T> = {
    [P in K]?:T[P]
} & {[P in Exclude<keyof T,K>]:T[P]}
```

## Parameters

**Parameters 获取函数的`参数类型`，将每个参数类型放在一个元组中。**

```
/**
 * @example
 * type Eg = [arg1: string, arg2: number];
 */
type Eg = Parameters<(arg1: string, arg2: number) => void>;
```

-   `Parameters`首先约束参数`T`必须是个**函数类型**，所以`(...args: any) => any>`替换成`Function`也是可以的
-   具体实现就是，判断`T`是否是函数类型，如果是则使用`inter P`让ts自己推导出函数的参数类型，并将推导的结果存到类型`P`上，否则就返回`never`；

**自实现**:

```
type MyParameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never
```

## ReturnType

传入一个函数类型，返回其返回值的类型

## InstanceType

使用： `传入一个类的类型，获取其实例类型`

```
class Person {}
​
const p1: Person = new Person()
//typeof 类：本质上获取到的是类的构造函数类型
//InstanceType<typeof Person> ： 获取构造函数构造出来的实例的类型
type HYPerson = InstanceType<typeof Person>
​
```

# 类型体操

## FunctionKeys

获取`T`中所有类型为函数的`key`组成的联合类型。

```
type NonUndefined<T> = T extends undefined ? never : T
​
//获取T中所有属性值类型为函数的key组成的联合类型
​
//先找出其所有属性值类型为函数的对象类型，同时将属性值变为其属性名，如果不是函数类型，那么类型为never
//最后通过 对象类型[keyof 对象类型] 获取到所有属性值不为never构成的联合类型
type FunctionKeys<T extends object> = {
    [P in keyof T]: NonUndefined<T[P]> extends Function ? P : never
}[keyof T]
​
type Person = {
    name: () => void
    age: () => void
    score: number
}
type p = FunctionKeys<Person>
​
```

## OptionalKeys

目标：`OptionalKeys<T>`提取T中所有可选类型的key组成的联合类型。

* * *

**这里需要知道一个细节 `{} extends {当前key:值}` 可以判断`当前key`是否是可选的**

```
type OptionalKeys<T> = {
    [P in keyof T]: {} extends Pick<T, P> ? P : never
}[keyof T]
​
```



# TS内置符号

## Omit--缺省

传入一个泛型<接口，接口对应里的字段>

它会返回一个新的类型，`新的类型就没有对应的字段`

```ts
interface TodO {
    title: string
    description: string
    completed: boolean
}
type TodoOmited = Omit<TodO, 'description'>
const todo1: TodoOmited = {
    title: '12',
    completed: true,
}
```

## Pick--挑选

传入一个泛型  <接口，接口里对应的字段>

它也会返回一个新的类型，`新的类型只有挑选得到的字段`

```ts

interface TodO {
    title: string
    description: string
    completed: boolean
}
type TodoOmited = Pick<TodO, 'description' | 'title'>
const todo1: TodoOmited = {
    title: 'string',
    description: '123',
}

```

## Partial--可选

传入一个泛型  <接口>

它会返回一个新的类型，`该类型中所有的字段都会变成可选的`

```ts
interface TodO {
    title: string
    description: string
    completed: boolean
}
type TodoOmited = Partial<TodO>
//interface TodO {
//    title?: string
//    description?: string
//    completed?: boolean
//}
const todo1: TodoOmited = {
    title: 'string',
    description: '123',
}
```

## ThisParameterType

> 获取某一类型中this的类型

```ts
function foo(this: { name: string }, obj: { name: string }) {
    console.log(this)
}

type fooType = typeof foo

type fooThisType = ThisParameterType<fooType>

let n: fooThisType = {
    name: 'zds'
}
```

![image-20230808163206735](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9fb99bda489c478fad5e4a1dd4124c98~tplv-k3u1fbpfcp-zoom-1.image)

## OmitThisParameter

> 用于移除一个函数类型Type的this参数类型，并且返回当前的函数类型


## InstanceType

语法：InstanceType<泛型>

作用：传入构造签名，获**取构造函数创建出来的具体的实例对象的类型**

```ts
class Person {}
​
const p1: Person = new Person()
​
//typeof Person  获取Person类也是构造函数具体的类型
//InstanceType   获取构造函数创建出来的具体的实例对象的类型
type HYPerson = InstanceType<typeof Person>
​
const p2: HYPerson = new Person()
​
//传入一个构造函数，返回其实例  (InstanceType<T>需要传入构造签名，返回对应的实例类型)
function factory<T extends new (...args: any[]) => any>(
  ctor: T
): InstanceType<T> {
  return new ctor()
}
​
const p3 = factory(Person)
​
```