enum Direction {
    UP = 100,
    DOWN,
    LEFT,
    RIGHT
}

enum Operation {
    //位运算  先转化二进制，然后向左移位
    Read = 1 << 0,
    foo = 1 << 2,
    write = 1 << 4
}

export {}
