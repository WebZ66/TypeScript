/* function getLength(str: string): number
function getLength(str: any[]): number
function getLength(str: any) {
    return str.length
}

console.log(getLength([1, 2, 3])) */

function getLength(str: string | any[]) {
    return str.length
}
