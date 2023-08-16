import type { AxiosRequestConfig } from 'axios'
class AxiosCancel {
    pendingMap = new Map<string, AbortController>()
    config: AxiosRequestConfig
    constructor(config: AxiosRequestConfig) {
        this.config = config
    }
    private getSymbolUrl(config: AxiosRequestConfig) {
        return [config.method, config.url].join('&')
    }
    /* 添加进缓存池  注意：原理是你每次发送的请求，都必须添加上一个新的signal标签，所以还是拆开写吧*/
    addRequest() {
        const symbolUrl = this.getSymbolUrl(this.config)
    }
    /* 取消请求 */
    cancelRequest(symbolUrl) {}
}
export default AxiosCancel
