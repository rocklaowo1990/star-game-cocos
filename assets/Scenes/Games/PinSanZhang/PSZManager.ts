import { _decorator, Component, Label, Node } from 'cc'
import { wsModule, Room, room, userInfo, common, wsReceive, utils } from '../../../Script';
import renewSeat from './RenewSeat';
import WsReceive from '../../../Script/Interface/WsReceive';

const { ccclass, property } = _decorator

@ccclass('PSZManager')
export class PSZManager extends Component {
    @property(Label)
    private roomIdLabel: Label

    @property(Label)
    private currentRoundLabel: Label

    @property(Label)
    private buttonReadyLabel: Label

    @property(Label)
    private gameTimerLabel: Label

    @property(Node)
    private buttonStart: Node

    @property(Node)
    private loadingBox: Node

    private port: number = 8080
    private isDisabled: boolean = false
    private isDisabledTimer: number
    private data = {}

    private gameTimer: number

    private room: Room


    start() {
        this.data = {
            uid: userInfo.uid,
            avatar: userInfo.avatar,
            nickName: userInfo.nickName,
            sex: userInfo.sex,
        }

        wsModule.init(this.port, this.onmessage.bind(this), this.onopen.bind(this))
        this.getRoomInfo()
    }

    private onmessage(data: string) {
        let _wsReceive = wsReceive.parse(JSON.parse(data))

        if (_wsReceive.type === 'timer') {
            console.log(_wsReceive.data.time);
            this.renewTime(_wsReceive.data.time)
        } else {
            console.log(_wsReceive);
            this.room = room.parse(_wsReceive.data)
            this.ready(this.room)
        }

    }

    private onopen(event: Event) {
        console.log(event);

    }

    update(deltaTime: number) {

    }

    private renewTime(time: number) {
        this.gameTimerLabel.getComponent(Label).string = utils.getTime(time)
    }

    // 设置按钮的防误操作
    private clearTimeoutDisabledTimer() {
        if (this.isDisabled) {
            this.isDisabledTimer = setTimeout(() => {
                this.isDisabled = false
                clearTimeout(this.isDisabledTimer)
                this.isDisabled = null
            }, 1500)
        }
    }

    // 发送玩家准备的请求
    private ready(room: Room) {
        this.renewRoomInfo(room)
        if (this.loadingBox.active) {
            setTimeout(() => {
                this.loadingBox.active = false
                common.showPop(this.room.message)
            }, 500)
        } else {
            common.showPop(this.room.message)
        }
    }

    private onReady() {
        if (!this.isDisabled && this.buttonReadyLabel.getComponent(Label).string === '准备') {
            wsModule.gameSend(userInfo.roomId, 'pin_san_zhang', 'ready', this.data)
            this.isDisabled = true
            this.buttonReadyLabel.getComponent(Label).string = '取消准备'
            this.clearTimeoutDisabledTimer()
        }

        if (!this.isDisabled && this.buttonReadyLabel.getComponent(Label).string === '取消准备') {
            wsModule.gameSend(userInfo.roomId, 'pin_san_zhang', 'unReady', this.data)
            this.isDisabled = true
            this.buttonReadyLabel.getComponent(Label).string = '准备'
            this.clearTimeoutDisabledTimer()
        }
    }

    private onStart() {
        if (!this.isDisabled) {
            this.isDisabled = true
            if (this.room.players.length >= 3) {
                wsModule.gameSend(userInfo.roomId, 'pin_san_zhang', 'start', this.data)
                this.isDisabled = true
            } else {
                common.showPop('游戏最少需要 3 个人')
            }
            this.clearTimeoutDisabledTimer()
        }
    }

    private exitRoom() {
        if (!this.isDisabled) {
            this.isDisabled = true
            this.clearTimeoutDisabledTimer()
        }
    }

    private renewRoomInfo(room: Room) {
        this.roomIdLabel.string = '房间: ' + room.roomId
        this.currentRoundLabel.string = '局数: ' + room.current + ' / ' + room.round

        if (room.players[0].uid === userInfo.uid) {
            this.buttonStart.active = true
        } else {
            this.buttonStart.active = false
        }

        let players = renewSeat(room.players)
        if (players[0].isReady) {
            this.buttonReadyLabel.getComponent(Label).string = '取消准备'
        } else {
            this.buttonReadyLabel.getComponent(Label).string = '准备'
        }

        for (let i = 0; i < players.length; i++) {
            let playerNodeName: string = 'Player' + i
            let player = this.node.getChildByName(playerNodeName)

            player.getChildByName('NickNameLabel').getComponent(Label).string = players[i].nickName
            player.getChildByName('FractionLabel').getComponent(Label).string = '得分: ' + players[i].fraction
            player.getChildByName('Avatar').active = players[i].avatar === '' ? false : true
            player.getChildByName('Poker').getChildByName('Folded').active = players[i].isFolded ? true : false

            switch (room.gameState) {
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
            wsModule.gameSend(userInfo.roomId, 'pin_san_zhang', 'enterRoom', this.data)
        }, 500)
    }

    protected onDestroy(): void {
        wsModule.close()
    }
}

