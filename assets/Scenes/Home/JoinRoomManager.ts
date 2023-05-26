import { _decorator, Component, director, EventTouch, Label, Node } from 'cc'
import { roomApi, webSocketClient, Response, userInfo } from '../../Script'

const { ccclass, property } = _decorator

@ccclass('JoinRoomManager')
export class JoinRoomManager extends Component {
    @property(Label)
    private Label1: Label

    @property(Label)
    private Label2: Label

    @property(Label)
    private Label3: Label

    @property(Label)
    private Label4: Label

    @property(Label)
    private Label5: Label

    @property(Label)
    private Label6: Label

    private numberList: string[]

    private roomId: string

    start() {
        this.numberList = []
        this.renewNumber()

    }

    renewNumber() {
        this.Label1.string = (this.numberList.length > 0) ? this.numberList[0] : '-'
        this.Label2.string = (this.numberList.length > 1) ? this.numberList[1] : '-'
        this.Label3.string = (this.numberList.length > 2) ? this.numberList[2] : '-'
        this.Label4.string = (this.numberList.length > 3) ? this.numberList[3] : '-'
        this.Label5.string = (this.numberList.length > 4) ? this.numberList[4] : '-'
        this.Label6.string = (this.numberList.length > 5) ? this.numberList[5] : '-'
        if (this.numberList.length >= 6) {
            this.roomId = this.numberList.join('')
            webSocketClient.showLoading()

            let data = {
                roomId: this.roomId,
                uid: userInfo.uid,
                callBack: this.joinRoomCallback.bind(this)
            }
            // 调用接口
            roomApi.joinRoom(data)
        }
    }

    private joinRoomCallback(r: Response) {
        let timerHideLoading = setTimeout(() => {
            webSocketClient.hideLoading()
            if (r.status != -1) {
                if (r.data.code == 200) {
                    userInfo.roomId = r.data.data.roomId
                    director.loadScene('PinSanZhang')
                    let timerHomeScene = setTimeout(() => {
                        webSocketClient.showPop(r.data.message)
                        clearTimeout(timerHomeScene)
                        timerHomeScene = null
                    }, 500)
                } else {
                    this.onClear()
                    webSocketClient.showPop(r.data.message)
                }
            }
            clearTimeout(timerHideLoading)
            timerHideLoading = null
        }, 1000)
    }

    update(deltaTime: number) {

    }

    private onNumber(event: EventTouch, data: string) {
        if (this.numberList.length < 6) {
            this.numberList.push(data)
            this.renewNumber()
        }
    }

    private onDelete() {
        this.numberList.pop()
        this.renewNumber()
    }

    private onClear() {
        this.numberList = []
        this.renewNumber()
    }

    private onHide() {
        this.node.active = !this.node.active
        this.numberList = []
        this.renewNumber()
    }
}

