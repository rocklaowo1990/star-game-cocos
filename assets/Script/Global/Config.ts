class Config {
    private static _instance: Config = null
    constructor() {

    }

    static getInstance() {
        if (!this._instance) {
            this._instance = new Config()
        }
        return this._instance
    }

    public salt: string

    public parse(json: any) {
        this.salt = json.salt
        return this
    }
}

export let config = Config.getInstance()
