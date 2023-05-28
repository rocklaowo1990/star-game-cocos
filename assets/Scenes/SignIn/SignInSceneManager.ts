import { _decorator, Button, Component, director, EditBox, Node } from 'cc'
import { userApi, userInfo, utils, Receive, common } from '../../Script'



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

    private responseSignIn: XMLHttpRequest


    start() {

    }

    update(deltaTime: number) {
        this.onTextChanged()
    }

    onDestroy(): void {
        if (this.responseSignIn != undefined) {
            this.responseSignIn.abort()
        }
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

        this.responseSignIn = userApi.signin({
            account: account,
            password: utils.encrypt(password),
            callBack: this.signInCallback,
        })
    }

    private signInCallback(r: Receive) {
        setTimeout(() => {
            common.hideLoading()
            if (r.code == 200) {
                userInfo.parse(r.data)
                director.loadScene('HomeScene')
                setTimeout(() => common.showPop(r.message), 500)
            } else {
                common.showPop(r.message)
            }
        }, 1000)
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

