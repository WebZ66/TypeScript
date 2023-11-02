//这里需要知道一个细节 {} extends {当前key:值} 可以判断当前key是否是可选的
type OptionalKeys<T> = {
    [P in keyof T]: {} extends Pick<T, P> ? P : never
}[keyof T]
