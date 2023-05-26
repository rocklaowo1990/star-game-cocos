export default class UserInfo {
    private static _instance: UserInfo = null
    constructor() {

    }

    static getInstance() {
        if (!this._instance) {
            this._instance = new UserInfo()
        }
        return this._instance
    }

    public uid: string = '66666666' // 用户的ID
    public account: string // 用户账号
    public invitationCode: string // 邀请码
    public avatar: string // 用户头像
    public sex: string // 用户性别
    public dress: string // 用户地址
    public nickName: string = '用户昵称七个字' // 用户的昵称
    public phone: string // 用户的手机
    public email: string // 用户的邮箱
    public superiorID: string // 上级ID
    public creatIp: string // 注册时的IP地址
    public roomId: string // 房间ID
    public token: string // token
    public gold: number // 金币
    public game: string // 当前游戏

    public parse(json: any) {
        this.uid = json.uid
        this.account = json.account
        this.invitationCode = json.invitationCode
        this.avatar = json.avatar
        this.sex = json.sex
        this.dress = json.dress
        this.nickName = json.nickName
        this.phone = json.phone
        this.email = json.email
        this.superiorID = json.superiorID
        this.creatIp = json.creatIp
        this.roomId = json.roomId
        this.token = json.token
        this.gold = json.gold
        this.game = json.game
        return this
    }
}
