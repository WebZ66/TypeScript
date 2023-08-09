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
