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
