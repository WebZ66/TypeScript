//作用：配合 | 联合类型 将多个字面量类型联合起来。
type DirectionType = 'left' | 'right' | 'top' | 'bottom'
type RequestMethod = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'get'
const d1: DirectionType = 'left'

function request(url: string, method: RequestMethod) {}

request('http://cs', 'DELETE')

//TS细节案例
const testInfo = {
    url: 'xxx',
    method: 'POST'
}
/* 因为testInfo.method类型是string类型 */
request(testInfo.url, testInfo.method as 'POST')

let n: 'POST' = 'POST'

const info2 = {
    name: '1',
    url: '12'
} as const
