import { Label, Animation, director } from "cc"

export default class WebSocketClient {
    private static _instance: WebSocketClient = null
    constructor() {

    }

    static getInstance() {
        if (!this._instance) {
            this._instance = new WebSocketClient()
        }
        return this._instance
    }

    /**
     * 
     * @param message 顶部的弹窗消息
     * @param 这里展示顶部弹窗的方法
     */
    public showPop(message: string) {
        const scene = director.getScene()

        if (scene) {
            let pop = scene.children[0].getChildByName('Pop')
            pop.getChildByName('Label').getComponent(Label).string = message
            pop.getComponent(Animation).play()
        }
    }

    /**
     * 
     * @param 这里展示Loading的方法
     * 在请求网络的时候会先出现 Loading
     */
    public showLoading() {
        const scene = director.getScene()

        if (scene) {
            let loading = scene.children[0].getChildByName('Loading')
            if (!loading.active) loading.active = true
        }
    }

    /**
     * 关闭Loading
     */
    public hideLoading() {
        const scene = director.getScene()

        if (scene) {
            let loading = scene.children[0].getChildByName('Loading')
            if (loading.active) loading.active = false
        }
    }
}