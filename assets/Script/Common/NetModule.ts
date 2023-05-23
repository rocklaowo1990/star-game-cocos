import { webSocketClient } from '../Global/WebSocketClient'
import { KeyCode, director } from 'cc'


class NetModule {
    private ws: WebSocket = null
    public isReconnect: boolean = true

    private static _instance: NetModule = null
    constructor() {

    }

    static getInstance() {
        if (!this._instance) {
            this._instance = new NetModule()
        }
        return this._instance
    }

    public init(port: number, onmessageCallback: Function) {
        this.ws = new WebSocket(`ws://localhost:${port}`)

        this.ws.onmessage = (event: MessageEvent) => {
            onmessageCallback(event.data)
        }

        this.ws.onclose = (event: Event) => {
            let scene = director.getScene()
            if (scene !== undefined) {
                webSocketClient.showLoading()
                if (this.isReconnect) {
                    this.isReconnect = false
                    setTimeout(() => {
                        this.init(port, onmessageCallback)
                        this.isReconnect = true
                    }, 3000)
                }
            }
        }

        this.ws.onerror = (event: Event) => {
        }

        this.ws.onopen = (event: Event) => {
            webSocketClient.hideLoading()
        }
    }

    public send(port: number, type: string, data: any) {
        let message = {
            port: port,
            type: type,
            data: data
        }
        this.ws.send(JSON.stringify(message))
    }
}

export let netModule: NetModule = NetModule.getInstance()

// class HttpModule {
//     private baseUrl: string
//     private static _instance: HttpModule = null
//     constructor() {
//         this.baseUrl = 'http://localhost:8080'
//     }

//     static getInstance() {
//         if (!this._instance) {
//             this._instance = new HttpModule()
//         }
//         return this._instance
//     }


//     public get(
//         url: string,
//         params?: any,
//         errCallback?: Function,
//     ) {
//         let xhr = new XMLHttpRequest()
//         xhr.onreadystatechange = function () {
//             if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
//                 var respone = xhr.responseText
//                 errCallback(respone);
//             }
//         }
//         xhr.open('GET', this.baseUrl + url + '?' + params, true)
//         xhr.withCredentials = false


//         xhr.setRequestHeader("Access-Control-Allow-Origin", "*") // 可将将 * 替换为指定的域名
//         xhr.setRequestHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Methods")

//         xhr.setRequestHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, UPDATE")
//         xhr.setRequestHeader("Access-Control-Expose-Headers", "Content-Length, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Cache-Control, Content-Language, Content-Type, Access-Control-Allow-Methods")
//         xhr.setRequestHeader("Access-Control-Allow-Credentials", "true")
//         // xhr.timeout = 8000
//         xhr.send()
//     }
// }

// export let httpModult: HttpModule = HttpModule.getInstance()

