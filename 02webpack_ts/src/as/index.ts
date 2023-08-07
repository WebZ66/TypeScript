function debounce(fn: any, time: number) {
    let timer: any = null
    return function (this: any, ...args: any[]) {
        if (timer) {
            clearTimeout(timer)
            timer = null
        }
        timer = setTimeout(() => {
            console.log(this)
            fn.apply(this, args)
        }, time)
    }
}
let obj = {
    name: 'obj',
    handle() {}
}

//说白了，只是把这个方法给window，最后还是window调用的这个方法
window.addEventListener('mousemove', debounce(obj.handle, 300))

export default {}
