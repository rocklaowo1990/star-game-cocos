import { PlayerData } from './PlayerData'

export class RoomData {
    public roomId: number
    public createUid: number
    public current: number
    public isAllDrop: boolean
    public round: number
    public gameName: string
    public gameState: string
    public players: PlayerData[]

    public from(data: any) {

        let roomData = new RoomData()

        roomData.roomId = data.roomId
        roomData.createUid = data.createUid
        roomData.current = data.current
        roomData.isAllDrop = data.isAllDrop
        roomData.round = data.round
        roomData.gameName = data.gameName
        roomData.gameState = data.gameState
        roomData.players = []

        if (data.players !== undefined) {
            for (let i = 0; i < data.players.length; i++) {
                let playerData = new PlayerData().from(data.players[i])
                roomData.players.push(playerData)
            }
        }

        return roomData
    }
}


