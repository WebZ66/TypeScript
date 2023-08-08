interface IFn {
    name: string
    (x: number): void
}
const fn: IFn = (x: number) => {}
fn.name = 'zds'
