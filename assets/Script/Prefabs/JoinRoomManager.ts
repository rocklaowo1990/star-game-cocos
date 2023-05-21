import { _decorator, Component, director, EventTouch, Label, Node } from 'cc';
import { webSocketClient } from '../Global/WebSocketClient';
import { netModule } from '../Common/NetModule';
import { receive } from '../Global/Receive';
import { userInfo } from '../Global/UserInfo';
const { ccclass, property } = _decorator;

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

    private port = 3002
    private roomId: number = undefined

    start() {
        this.numberList = []
        this.renewNumber()
        netModule.init(this.port, this.con.bind(this))

    }

    private con(data: string) {
        let _data = receive.from(data)

        setTimeout(() => {
            this.numberList = []
            this.renewNumber()
            webSocketClient.hideLoading()
            if (_data.code === 200) {
                userInfo.roomId = this.roomId
                director.loadScene('PinSanZhang')
                setTimeout(() => {
                    webSocketClient.showPop(_data.message)
                }, 500)
            } else {
                webSocketClient.showPop(_data.message)
            }
        }, 1000)
    }

    renewNumber() {
        this.Label1.string = (this.numberList.length > 0) ? this.numberList[0] : '-'
        this.Label2.string = (this.numberList.length > 1) ? this.numberList[1] : '-'
        this.Label3.string = (this.numberList.length > 2) ? this.numberList[2] : '-'
        this.Label4.string = (this.numberList.length > 3) ? this.numberList[3] : '-'
        this.Label5.string = (this.numberList.length > 4) ? this.numberList[4] : '-'
        this.Label6.string = (this.numberList.length > 5) ? this.numberList[5] : '-'
        if (this.numberList.length >= 6) {
            this.roomId = Number(this.numberList.join(''))
            webSocketClient.showLoading()

            let _data = {
                roomId: this.roomId,
            }
            netModule.send(this.port, 'joinRoom', _data)
        }
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

