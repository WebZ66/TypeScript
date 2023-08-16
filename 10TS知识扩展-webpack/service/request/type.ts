import { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

export interface IHYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
    interceptors?: {
        requestSuccess: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
        requestError: (err: any) => any
        responseSuccess: (config: T) => T
        responseError: (err: any) => any
    }
}
