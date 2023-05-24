import { httpModule } from "../Common/HttpModule"

export class ConfigAPi {
    private static _instance: ConfigAPi = null
    constructor() {

    }

    static getInstance() {
        if (!this._instance) {
            this._instance = new ConfigAPi()
        }
        return this._instance
    }

    public getConfig(callBack: Function) {
        let url = '/config/getConfig'
        let response = httpModule.get(url, callBack)
        return response
    }
}

export let configApi: ConfigAPi = ConfigAPi.getInstance()


