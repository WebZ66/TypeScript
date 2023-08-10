//元组  useState

function useState<T>(initialState: T): [T, (value: T) => void] {
    let state = initialState
    function setState(newState: T) {
        state = newState
    }
    return [state, setState]
}

//初始化count
const [count, setCount] = useState<number[]>([])
