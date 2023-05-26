import { _decorator, Component, director, Label, Node } from 'cc'
import { roomApi, userInfo, Response, webSocketClient } from '../../Script'

const { ccclass, property } = _decorator


@ccclass('HomeManager')
export class HomeManager extends Component {
    @property(Label)
    private nickNameLabel: Label

    @property(Label)
    private idLabel: Label

    @property(Node)
    private createRoom: Node

    @property(Node)
    private joinRoom: Node

    start() {
        this.nickNameLabel.getComponent(Label).string = userInfo.nickName
        this.idLabel.getComponent(Label).string = `ID: ${userInfo.uid}`
        this.checkInRoom()
    }

    update(deltaTime: number) {

    }

    private onShowCreateRoom() {
        this.createRoom.active = !this.createRoom.active
    }

    private onShowJoinRoom() {
        this.joinRoom.active = !this.createRoom.active

    }

    private onTeris() {
        director.loadScene("Tetris")
    }

    private checkInRoom() {
        webSocketClient.showLoading()
        setTimeout(() => {
            roomApi.checkInRoom({
                uid: userInfo.uid,
                callBack: this.responseCallback
            })
        }, 500)
    }

    private responseCallback(r: Response) {
        setTimeout(function () {
            webSocketClient.hideLoading()
            if (r.status != -1) {
                if (r.data.code == 200) {
                    userInfo.roomId = r.data.data.roomId
                    userInfo.game = r.data.data.game
                    if (userInfo.game == 'pin_san_zhang') {
                        director.loadScene('PinSanZhang')
                    }
                }
            }
        }.bind(this), 500)
    }
}


