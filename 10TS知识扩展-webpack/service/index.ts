import HYRequest from './request/index'

export const hyRequest = new HYRequest({
    baseURL: 'http://localhost:9000/api',
    timeout: 5000,
    interceptors: {
        requestSuccess(config) {
            console.log('自定义的实例对象的请求拦截器')
            return config
        },
        requestError(err) {
            console.log(err)
        },
        responseSuccess(res) {
            console.log('自定义的实例对象的响应拦截器')
            return res
        },
        responseError(err) {
            console.log(err)
        }
    }
})
