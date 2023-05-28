export default class WsReceive {
    type: string
    data: any

    public parse(data: any) {
        this.type = data.type
        this.data = data.data
        return this
    }
}