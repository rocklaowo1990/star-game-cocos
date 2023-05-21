import { _decorator, Button, Component, director, EditBox, Node } from 'cc'
import { netModule } from '../../Common/NetModule'
import { userInfo } from '../../Global/UserInfo'
import { webSocketClient } from '../../Global/WebSocketClient'
import { receive } from '../../Global/Receive'
const { ccclass, property } = _decorator

@ccclass('SignInManager')
export class SignInManager extends Component {
    @property(Node)
    private accountInput: Node

    @property(Node)
    private passwordInput: Node

    @property(Button)
    private signInButton: Node

    @property(Node)
    private pop: Node

    @property(Node)
    private loading: Node

    private port: number = 3000


    start() {
        netModule.init(this.port, this.con)
    }

    update(deltaTime: number) {
        this.onTextChanged()
    }

    private con(data: string) {
        let _data = receive.from(data)

        setTimeout(() => {
            webSocketClient.hideLoading()
            if (_data.code === 200) {
                userInfo.roomId = _data.data.roomId
                userInfo.avatarUrl = _data.data.avatarUrl
                userInfo.uid = _data.data.uid
                userInfo.nickName = _data.data.nickName
                userInfo.roomCards = _data.data.roomCards

                director.loadScene('HomeScene')
                setTimeout(() => {
                    webSocketClient.showPop('欢迎回来 ' + _data.data.nickName)
                }, 500)
            } else {
                webSocketClient.showPop(_data.message)
            }
        }, 1000)
    }

    /**
    * @text
    * 登陆按钮点击事件
    * @button
    * 向服务器请求登陆
    */
    private onSignIn() {
        this.loading.active = true

        let account = this.accountInput.getComponent(EditBox).string
        let password = this.passwordInput.getComponent(EditBox).string

        let data = {
            account: account,
            password: password
        }

        netModule.send(this.port, 'signIn', data)
    }

    private onSignUp() {
        director.loadScene('SignUpScene')
    }


    private onTextChanged() {
        const isNotAccountInput = this.accountInput.getComponent(EditBox).string === ''
        const isNotPasswordInput = this.passwordInput.getComponent(EditBox).string === ''

        if (isNotAccountInput || isNotPasswordInput) {
            this.signInButton.getComponent(Button).interactable = false
        } else {
            this.signInButton.getComponent(Button).interactable = true
        }
    }
}

