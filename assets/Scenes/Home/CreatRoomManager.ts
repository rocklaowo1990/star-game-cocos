import { _decorator, Component, director, EventTouch } from 'cc'
import { roomApi, userInfo, webSocketClient, Response } from '../../Script'

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
            game: 'pin_san_zhang',
            callBack: this.creatRoomCallback
        }
        // 调用接口
        roomApi.createRoom(data)
    }

    private creatRoomCallback(r: Response) {
        let timerHideLoading = setTimeout(() => {
            webSocketClient.hideLoading()
            if (r.status != -1) {
                if (r.data.code == 200) {
                    director.loadScene('PinSanZhang')
                    userInfo.roomId = r.data.data.roomId
                    let timerHomeScene = setTimeout(() => {
                        webSocketClient.showPop(r.data.message)
                        clearTimeout(timerHomeScene)
                        timerHomeScene = null
                    }, 500)
                } else {
                    webSocketClient.showPop(r.data.message)
                }
            }
            clearTimeout(timerHideLoading)
            timerHideLoading = null
        }, 1000)
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

