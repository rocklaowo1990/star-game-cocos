export default class Player {
    public uid: string
    public avatar: string
    public sex: string
    public nickName: string
    public fraction: string
    public isFolded: boolean
    public isReady: boolean




    public parse(data: any) {

        this.uid = data.uid
        this.avatar = data.avatar
        this.sex = data.sex
        this.nickName = data.nickName
        this.fraction = data.fraction
        this.isFolded = data.isFolded
        this.isReady = data.isReady


        return this
    }
}


