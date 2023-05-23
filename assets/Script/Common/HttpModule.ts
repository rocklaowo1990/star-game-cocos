export class HttpModule {
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
            if (this.xhr.readyState === 4 && this.xhr.status == 200) {
                let respone: ResponseData = {
                    status: this.xhr.status,
                    data: new ReceiveData().parse(this.xhr.response)
                }
                callBack(respone)
            } else {
                let respone: ResponseData = { status: -1, data: null }
                callBack(respone)
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
        params: string,
    ) {
        var path = this.baseUrl + url
        if (params) path += '?' + params
        this.xhr.open('POST', path, true)
        this.xhr.onreadystatechange = () => {
            if (this.xhr.readyState === 4 && this.xhr.status == 200) {
                let respone: ResponseData = {
                    status: this.xhr.status,
                    data: new ReceiveData().parse(this.xhr.response)
                }
                callBack(respone)
            } else {
                let respone: ResponseData = { status: -1, data: null }
                callBack(respone)
            }
        }

        this.xhr.timeout = this.timeout
        this.xhr.send()
        // this.xhr.abort() 请求终止
        return this.xhr
    }
}

export let httpModule: HttpModule = HttpModule.getInstance()


export type ResponseData = {
    status: number,
    data: ReceiveData,
}

class ReceiveData {
    code: number
    message: string
    data: any
    public parse(data: any) {
        let _data = JSON.parse(data)
        this.code = _data.code
        this.message = _data.message
        this.data = _data.data
        return this
    }
}


