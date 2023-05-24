

export class Player {
    public uid: string
    public avatar: string
    public sex: string
    public nickName: string
    public fraction: string
    public isFolded: boolean
    public isReady: boolean
    public roomCards: number


    public parse(data: any) {

        this.uid = data.string
        this.avatar = data.string
        this.sex = data.string
        this.sex = data.sex
        this.nickName = data.string
        this.fraction = data.fraction
        this.isFolded = data.isFolded
        this.isReady = data.isReady
        this.roomCards = data.roomCards


        return this
    }
}


