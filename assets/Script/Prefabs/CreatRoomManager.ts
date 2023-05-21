import { _decorator, Component, director, EventTouch, Node } from 'cc'
import { netModule } from '../Common/NetModule'
import { webSocketClient } from '../Global/WebSocketClient'
import { userInfo } from '../Global/UserInfo'
import { receive } from '../Global/Receive'
const { ccclass, property } = _decorator

@ccclass('CreatRoomManager')
export class CreatRoomManager extends Component {
    private port: number = 3002
    public isAllDrop: boolean = true
    public round: number = 10


    start() {
        netModule.init(this.port, this.con)
    }

    update(deltaTime: number) {

    }

    private con(data: string) {
        let _data = receive.from(data)

        setTimeout(() => {
            webSocketClient.hideLoading()
            if (_data.code === 200) {
                userInfo.roomId = _data.data.roomId
                director.loadScene('PinSanZhang')
                setTimeout(() => {
                    webSocketClient.showPop(_data.message)
                }, 500)
            } else {
                webSocketClient.showPop(_data.message)
            }
        }, 1000)
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

        netModule.send(this.port, 'createRoom', data)
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

