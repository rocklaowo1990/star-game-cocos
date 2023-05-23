import { _decorator, Component, director, Label, Node } from 'cc'
import { userInfo } from '../../Global/UserInfo'
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



}

