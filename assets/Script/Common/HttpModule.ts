import { receive } from '../index'

export default class HttpModule {
    private xhr: XMLHttpRequest
    private baseUrl: string
    private timeout: number

    private static _instance: HttpModule = null
    constructor() {
        this.baseUrl = "http://localhost:8080"
        this.timeout = 5000
        this.xhr = new XMLHttpRequest()
    }

    static getInstance() {
        if (!this._instance) {
            this._instance = new HttpModule()
        }
        return this._instance
    }

    public get(
        url: string,
        callBack: Function,
        params?: string,
    ) {
        var path = this.baseUrl + url
        if (params) path += '?' + params
        this.xhr.open('GET', path, true)
        this.xhr.onreadystatechange = () => {
            if (this.xhr.readyState === 4) {
                if (this.xhr.status === 200) {
                    callBack(receive.parse(this.xhr.response))
                } else {
                    let _receive = receive
                    _receive.code = -1
                    _receive.message = '服务器连接失败'
                    callBack(_receive)
                }
            }
        }

        this.xhr.timeout = this.timeout
        this.xhr.send()
        // this.xhr.abort() 请求终止
        return this.xhr
    }

    public post(
        url: string,
        callBack: Function,
        params?: string,
    ) {
        var path = this.baseUrl + url
        if (params) path += '?' + params
        this.xhr.open('POST', path, true)
        this.xhr.onreadystatechange = () => {
            if (this.xhr.readyState === 4) {
                if (this.xhr.status === 200) {
                    callBack(receive.parse(this.xhr.response))
                } else {
                    let _receive = receive
                    _receive.code = -1
                    _receive.message = '服务器连接失败'
                    callBack(_receive)
                }
            }
        }
        this.xhr.timeout = this.timeout
        this.xhr.send()
        // this.xhr.abort() 请求终止
        return this.xhr
    }
}



