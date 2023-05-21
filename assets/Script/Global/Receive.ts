export default class Receive {
    private static _instance: Receive = null
    constructor() {

    }

    static getInstance() {
        if (!this._instance) {
            this._instance = new Receive()
        }
        return this._instance
    }

    public type: string = 'login'
    public code: number = 200
    public message: string = '登陆成功'
    public data: any = {}

    public from(json: string) {
        let _json = JSON.parse(json)
        this.type = _json.type
        this.code = _json.code
        this.message = _json.message
        this.data = _json.data
        return this
    }
}

export let receive = Receive.getInstance()
