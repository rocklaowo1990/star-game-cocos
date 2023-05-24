import { _decorator, Component, Label, Node } from 'cc';
import { netModule } from '../../Common/NetModule';
import { webSocketClient } from '../../Global/WebSocketClient';
import { userInfo } from '../../Global/UserInfo';
import Receive, { receive } from '../../Global/Receive';
import { Room } from '../../Interface/Room';
import { Player } from '../../Interface/Player';
const { ccclass, property } = _decorator;

@ccclass('PSZManager')
export class PSZManager extends Component {
    @property(Label)
    private roomIdLabel: Label

    @property(Label)
    private currentRoundLabel: Label

    @property(Node)
    private loadingBox: Node

    private port: number = 3002


    start() {
        netModule.init(this.port, this.con.bind(this))
        this.getRoomInfo()
    }

    private con(data: string) {
        let _data = receive.from(data)
        switch (_data.type) {
            case 'enterRoom':
                this.enterRoom(_data)
                break

            default:
                break
        }
    }

    update(deltaTime: number) {

    }

    private enterRoom(data: Receive) {
        setTimeout(() => {
            this.loadingBox.active = false
            if (data.code === 200) {
                let roomData = new Room().parse(data.data)
                this.renewRoomInfo(roomData)
            }
            webSocketClient.showPop(data.message)
        }, 1000)
    }

    private renewSeat(players: Player[]) {
        let uid = userInfo.uid
        let _players = [...players]

        let i = 0
        while (i < _players.length) {
            if (_players[i].uid === uid) {
                let newPlayers = _players.splice(i, _players.length - i)
                return newPlayers.concat(_players)
            } else {
                i++
            }
        }
    }


    private renewRoomInfo(roomData: Room) {
        this.roomIdLabel.string = '房间: ' + roomData.roomId
        this.currentRoundLabel.string = '局数: ' + roomData.current + ' / ' + roomData.round

        let players: Player[] = this.renewSeat(roomData.players)

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
                roomId: userInfo.roomId,
                avatarUrl: userInfo.avatar,
                nickName: userInfo.nickName,
                roomCards: userInfo.gold,
            }

            netModule.send('pin_san_zhang', 'enterRoom', data)
        }, 500)
    }

    protected onDestroy(): void {
        netModule.close()
    }
}

