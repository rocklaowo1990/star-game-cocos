import { Player, player } from '../index'

export default class Room {
    public roomId: string
    public createUid: string
    public current: number
    public isAllDrop: boolean
    public round: number
    public game: string
    public gameState: string
    public players: Player[]
    public message: string

    public parse(data: any) {

        let roomData = new Room()

        roomData.roomId = data.roomId
        roomData.createUid = data.createUid
        roomData.current = data.current
        roomData.isAllDrop = data.isAllDrop
        roomData.round = data.round
        roomData.game = data.game
        roomData.gameState = data.gameState
        roomData.players = []
        roomData.message = data.message

        if (data.players !== undefined) {
            for (let i = 0; i < data.players.length; i++) {
                roomData.players.push(data.players[i])
            }
        }

        return roomData
    }
}


