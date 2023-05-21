

export class PlayerData {
    public uid: number
    public nickName: string
    public avatarUrl: string
    public roomCards: number
    public fraction: number
    public isReady: boolean
    public isWin: boolean
    public isFolded: boolean

    public from(data: any) {

        this.uid = data.uid
        this.nickName = data.nickName
        this.avatarUrl = data.avatarUrl
        this.roomCards = data.roomCards
        this.fraction = data.fraction
        this.isReady = data.isReady
        this.isWin = data.isWin
        this.isFolded = data.isFolded

        return this
    }
}


