type callbackType = (num1: number, num2: number) => number

function fn(callback: callbackType) {
    callback(10, 20)
}

fn(function (num1,num2,num3) {
    return 1
})
