interface IPerson {
    name: string
    age: number
}

interface IKun extends IPerson {
    slogan: string
}

const ikun: IKun = {
    name: 'why',
    age: 12,
    slogan: '13'
}
