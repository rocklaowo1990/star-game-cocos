import { _decorator, Component, Label, logID, Node } from 'cc'
import { wsModule, Player, Room, room, userInfo, webSocketClient } from '../../../Script';

const { ccclass, property } = _decorator

@ccclass('PSZManager')
export class PSZManager extends Component {
    @property(Label)
    private roomIdLabel: Label

    @property(Label)
    private currentRoundLabel: Label

    @property(Node)
    private loadingBox: Node

    private port: number = 8080


    start() {
        wsModule.init(this.port, this.conn.bind(this))
        this.getRoomInfo()
    }

    private conn(data: string) {
        console.log(data)

        let roomData = room.parse(JSON.parse(data))
        console.log(roomData.gameState)
        console.log(roomData)

        switch (roomData.gameState) {
            case "ready":
                this.ready(roomData)
        }

    }

    update(deltaTime: number) {

    }

    private ready(roomData: Room) {
        if (this.loadingBox.active) this.loadingBox.active = false
        this.renewRoomInfo(roomData)
        webSocketClient.showPop(roomData.message)
    }

    private renewSeat(players: Player[]): Player[] {
        let uid = userInfo.uid
        let _players = [...players]

        let i = 1
        while (i < _players.length) {
            console.log(_players[i].uid + '------' + uid);

            if (_players[i].uid === uid) {
                let newPlayers = _players.splice(i, _players.length - i)
                return newPlayers.concat(_players)
            } else {
                i++
            }
        }
        return _players
    }


    private renewRoomInfo(roomData: Room) {
        this.roomIdLabel.string = '房间: ' + roomData.roomId
        this.currentRoundLabel.string = '局数: ' + roomData.current + ' / ' + roomData.round

        let players = this.renewSeat(roomData.players)
        // let players = [...roomData.players]

        for (let i = 0; i < players.length; i++) {
            let playerNodeName: string = 'Player' + i

            let player = this.node.getChildByName(playerNodeName)

            player.getChildByName('NickNameLabel').getComponent(Label).string = players[i].nickName
            player.getChildByName('FractionLabel').getComponent(Label).string = '得分: ' + players[i].fraction
            player.getChildByName('Avatar').active = players[i].avatar === '' ? false : true
            player.getChildByName('Poker').getChildByName('Folded').active = players[i].isFolded ? true : false


            switch (roomData.gameState) {
                case 'ready':
                    player.getChildByName('Preparing').active = players[i].isReady ? false : true
                    player.getChildByName('Ready').active = players[i].isReady ? true : false
                    break

                case 'start':
                    player.getChildByName('Preparing').active = false
                    player.getChildByName('Ready').active = false
                    player.getChildByName('Poker').active = true
                    break

                default:
                    break
            }
        }
    }

    private getRoomInfo() {
        setTimeout(() => {
            let data = {
                uid: userInfo.uid,
                avatar: userInfo.avatar,
                nickName: userInfo.nickName,
                sex: userInfo.sex,
            }
            wsModule.gameSend(userInfo.roomId, 'pin_san_zhang', 'enterRoom', data)
        }, 500)
    }

    protected onDestroy(): void {
        wsModule.close()
    }
}

