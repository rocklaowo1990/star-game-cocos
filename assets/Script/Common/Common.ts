import { Label, director, Animation } from "cc"

export default class Common {

    private static _instance: Common = null
    constructor() {

    }

    static getInstance() {
        if (!this._instance) {
            this._instance = new Common()
        }
        return this._instance
    }

    public showPop(message: string) {
        const scene = director.getScene()

        if (scene) {
            let pop = scene.children[0].getChildByName('Pop')
            pop.getChildByName('Label').getComponent(Label).string = message
            pop.getComponent(Animation).play()
        }
    }

    public showWsLoading() {
        const scene = director.getScene()

        if (scene) {
            let loading = scene.children[0].getChildByName('WsLoading')
            if (!loading.active) loading.active = true
        }
    }

    public hideWsLoading() {
        const scene = director.getScene()
        if (scene) {
            let loading = scene.children[0].getChildByName('WsLoading')
            if (loading.active) loading.active = false
        }
    }

    public showLoading() {
        const scene = director.getScene()

        if (scene) {
            let loading = scene.children[0].getChildByName('Loading')
            if (!loading.active) loading.active = true
        }
    }

    public hideLoading() {
        const scene = director.getScene()
        if (scene) {
            let loading = scene.children[0].getChildByName('Loading')
            if (loading.active) loading.active = false
        }
    }
}