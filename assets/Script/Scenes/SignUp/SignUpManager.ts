import { _decorator, Button, Component, director, EditBox, Node } from 'cc'
import { netModule } from '../../Common/NetModule'
import { webSocketClient } from '../../Global/WebSocketClient'
import { receive } from '../../Global/Receive'
const { ccclass, property } = _decorator

@ccclass('SignUpManager')
export class SignUpManager extends Component {
    @property(Node)
    private accountInput: Node

    @property(Node)
    private passwordInput: Node

    @property(Node)
    private passwordInputRe: Node

    @property(Button)
    private signUpButton: Node

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
                director.loadScene('SignInScene')
                setTimeout(() => {
                    webSocketClient.showPop('注册成功')
                }, 500)
            } else {
                webSocketClient.showPop(_data.message)
            }
        }, 1000)
    }


    private onBack() {
        director.loadScene('SignInScene')
    }

    private onTextChanged() {
        const isNotAccountInput = this.accountInput.getComponent(EditBox).string === ''
        const isNotPasswordInput = this.passwordInput.getComponent(EditBox).string === ''
        const isNotPasswordReInput = this.passwordInputRe.getComponent(EditBox).string === ''

        if (isNotAccountInput || isNotPasswordInput || isNotPasswordReInput) {
            this.signUpButton.getComponent(Button).interactable = false
        } else {
            this.signUpButton.getComponent(Button).interactable = true
        }
    }

    /**
    * @text
    * 登陆按钮点击事件
    * @button
    * 向服务器请求登陆
    */
    private onSignUp() {
        let account = this.accountInput.getComponent(EditBox).string
        let password = this.passwordInput.getComponent(EditBox).string
        let passwordRe = this.passwordInputRe.getComponent(EditBox).string

        if (password !== passwordRe) {
            webSocketClient.showPop('两次输入的密码不一致')
            return
        }

        this.loading.active = true

        let data = {
            account: account,
            password: password
        }

        netModule.send(this.port, 'signUp', data)
    }
}

