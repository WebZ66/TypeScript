import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

/* 自定义实例对象的拦截器回调函数类型 */
import type { IHYRequestConfig } from './type'

class HYRequest {
    public instance: AxiosInstance
    public pendingMap = new Map<string, AbortController>()
    constructor(config: IHYRequestConfig) {
        //创建出实例
        this.instance = axios.create(config)
        this.instance.interceptors.request.use(
            (config) => {
                //添加token，添加loading效果等等
                console.log('全局请求成功的拦截')
                return config
            },
            (error) => {
                return error
            }
        )
        this.instance.interceptors.response.use(
            (res) => {
                return res
            },
            (error) => {
                return error
            }
        )
        //判断是否有自定义的实例拦截器，如果有就执行(注意：拦截器是可以存在多个的，不会影响到全局拦截器，会依次执行)
        //从而实现请求的精细化处理，可以动态添加实例拦截器
        //拦截顺序  实例请求-->类请求拦截-->实例响应拦截-->类响应拦截
        this.instance.interceptors.request.use(config.interceptors?.requestSuccess, config.interceptors?.requestError)
        this.instance.interceptors.response.use(config.interceptors?.responseSuccess, config.interceptors?.responseError)
    }
    //封装单个网络请求的拦截器
    //T：返回的真实data的类型 调用request方法时传递
    request<T>(config: IHYRequestConfig<T>) {
        //注意this.instance.request()即axios.request()
        if (config.interceptors?.requestSuccess) {
            config = config.interceptors.requestSuccess(config as InternalAxiosRequestConfig)
        }
        return new Promise<T>((resolve, reject) => {
            this.instance.request<any, T>(config).then((res) => {
                if (config.interceptors?.responseSuccess) {
                    config.interceptors.responseSuccess(res)
                }
                resolve(res)
            })
        })
    }
    get(url: string, params?: any) {
        return this.instance.get(url, params)
    }
}

export default HYRequest
