class UserInfo {
    private static _instance: UserInfo = null
    constructor() {

    }

    static getInstance() {
        if (!this._instance) {
            this._instance = new UserInfo()
        }
        return this._instance
    }

    public roomId: number = 0
    public avatarUrl: string = '默认地址'
    public uid: number = 666666
    public nickName: string = '玩家6666'
    public roomCards: number = 10
    public gold: number = 0
}

export let userInfo = UserInfo.getInstance()