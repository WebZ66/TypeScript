type MapPerson<Type> = {
    [Property in keyof Type]-?: Type[Property]
}
interface Person {
    name?: string
    age?: number
}

type newPersonType = MapPerson<Person>





let p: newPersonType = {

}
