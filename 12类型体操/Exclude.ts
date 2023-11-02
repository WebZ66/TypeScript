/**
 * @example
 *  type Eg = 'key1'
 */

type Person = {
    name: string
    age: number
    score: number
}

type A = Exclude<keyof Person, 'name'>
