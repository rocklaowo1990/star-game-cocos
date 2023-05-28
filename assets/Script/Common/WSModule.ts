import { director } from "cc"
import { common } from '../index'

export default class WSModule {
    private ws: WebSocket = null
    public isReconnect: boolean = true

    private static _instance: WSModule = null
    constructor() {

    }

    static getInstance() {
        if (!this._instance) {
            this._instance = new WSModule()
        }
        return this._instance
    }

    public init(port: number, onmessageCallback: Function, onopenCallback?: Function) {
        this.ws = new WebSocket(`ws://localhost:${port}/ws`)

        this.ws.onmessage = (event: MessageEvent) => {
            onmessageCallback(event.data)
        }

        this.ws.onclose = (event: Event) => {
            let scene = director.getScene()
            if (scene !== undefined) {
                common.showWsLoading()
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
            common.hideWsLoading()
            this.heartbeat()
            onopenCallback(event)
        }
    }

    public close() {
        this.ws.close()
    }

    public gameSend(roomId: string, game: string, type: string, data: any) {
        let message = {
            roomId: roomId,
            game: game,
            type: type,
            data: data
        }
        this.ws.send(JSON.stringify(message))
    }

    private heartbeat() {
        let message = {
            type: "ping",
        }

        setInterval(() => {
            console.log('=>');

            this.ws.send(JSON.stringify(message))
        }, 1000 * 60)

    }
}
