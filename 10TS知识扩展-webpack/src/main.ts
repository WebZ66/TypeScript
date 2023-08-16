import { AxiosRequestConfig } from 'axios'
import { hyRequest } from '../service/index'
interface IHomeData {
    name: string
    age: number
}
hyRequest.request<IHomeData>({ url: '/get', method: 'get' }).then((res) => {
    console.log(res.name)
})
