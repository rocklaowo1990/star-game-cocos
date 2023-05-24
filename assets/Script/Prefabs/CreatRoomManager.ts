import { _decorator, Component, director, EventTouch, Node } from 'cc'
import { netModule } from '../Common/NetModule'
import { webSocketClient } from '../Global/WebSocketClient'
import { userInfo } from '../Global/UserInfo'
import { receive } from '../Global/Receive'
const { ccclass, property } = _decorator

@ccclass('CreatRoomManager')
export class CreatRoomManager extends Component {
    public isAllDrop: boolean = true
    public round: number = 10


    start() {
    }

    update(deltaTime: number) {

    }

    private onCreateRoom() {
        webSocketClient.showLoading()

        let round = this.round
        let isAllDrop = this.isAllDrop

        let data = {
            createUid: userInfo.uid,
            round: round,
            isAllDrop: isAllDrop,
            gameName: 'pinsanzhang'
        }

        // netModule.send('pin_san_zhang', 'createRoom', data)
        // 调用接口
    }

    private onChooseRoomsCount(event: EventTouch, data: string) {
        switch (data) {
            case '10':
                this.round = 10
                break

            case '20':
                this.round = 20
                break

            default:
                break
        }
    }

    private onHide() {
        this.node.active = !this.node.active
    }

    private onChooseAllPrice() {
        this.isAllDrop = !this.isAllDrop
    }
}

