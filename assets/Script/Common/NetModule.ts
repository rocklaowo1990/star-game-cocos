import { webSocketClient } from '../Global/WebSocketClient'
import { director } from 'cc'


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

