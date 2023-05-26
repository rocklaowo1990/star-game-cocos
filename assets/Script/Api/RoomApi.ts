import { httpModule } from '../index'


export default class RoomApi {
    private static _instance: RoomApi = null
    constructor() {

    }

    static getInstance() {
        if (!this._instance) {
            this._instance = new RoomApi()
        }
        return this._instance
    }

    public createRoom(data: {
        game: string
        createUid: string
        round: number
        isAllDrop: boolean
        callBack: Function
    }) {
        let url = '/room/create'
        let params = 'game=' + data.game + '&createUid=' + data.createUid + '&round=' + data.round + '&isAllDrop=' + data.isAllDrop
        let response = httpModule.post(url, data.callBack, params)
        return response
    }

    public joinRoom(data: {
        uid: string
        roomId: string
        callBack: Function
    }) {
        let url = '/room/join'
        let params = 'uid=' + data.uid + '&roomId=' + data.roomId
        let response = httpModule.post(url, data.callBack, params)
        return response
    }

    public checkInRoom(data: {
        uid: string
        callBack: Function
    }) {
        let url = '/room/checkinroom'
        let params = 'uid=' + data.uid
        let response = httpModule.get(url, data.callBack, params)
        return response
    }
}
