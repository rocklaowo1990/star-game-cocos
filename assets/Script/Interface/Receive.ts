export default class Receive {
    code: number
    message: string
    data: any

    public parse(data: any) {
        let _data = JSON.parse(data)
        this.code = _data.code
        this.message = _data.message
        this.data = _data.data
        return this
    }
}