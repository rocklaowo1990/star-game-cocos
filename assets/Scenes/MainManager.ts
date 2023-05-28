import { _decorator, Component, director, Label, Node, ProgressBar, RichText } from 'cc'
import { config, configApi, Receive, utils } from '../Script'

const { ccclass, property } = _decorator

@ccclass('MainManager')
export class MainManager extends Component {
    private responseConfig: XMLHttpRequest
    private responseCheckUpdate: XMLHttpRequest

    @property(Node)
    private ProgressBar: Node

    @property(Node)
    private alertBox: Node

    @property(RichText)
    private infoLabel: RichText

    @property(RichText)
    private progressLabel: RichText

    private progress: number = 0.00
    private progressTimer: number = null

    // 连接失败后执行的事物
    private reDo: Function = function () { }
    private nextDo: Function = function () { }

    start() {
        this.checkUpdate()
    }

    private checkUpdate() {
        this.infoLabel.getComponent(RichText).string = utils.setRichText('正在检查更新...', '#0fffff')
        this.progressLabel.getComponent(RichText).string = utils.setRichText('0.00%', '#0fffff')
        this.resetProgressTimer()
        this.startProgressTmer()
        this.getConfig()
    }

    // 获取系统配置信息
    private getConfig() {
        this.responseCheckUpdate = configApi.getConfig(this.checkUpdateApiCallBack.bind(this))
    }

    private checkUpdateApiCallBack(r: Receive) {
        if (r.code === 200) {
            config.parse(r.data)
            if (this.progressTimer === null) this.startProgressTmer()
            this.nextDo = this.loadingApi.bind(this)
        } else {
            this.pauseProgressTmer()
            this.reDo = this.getConfig.bind(this)
            this.alertBox.active = true
        }
    }

    private loadingApi() {
        this.infoLabel.getComponent(RichText).string = utils.setRichText('正在加载数据...', '#0fffff')
        this.progressLabel.getComponent(RichText).string = utils.setRichText('0.00%', '#0fffff')
        this.resetProgressTimer()
        this.startProgressTmer()
        this.getConfig2()
    }

    private getConfig2() {
        this.responseCheckUpdate = configApi.getConfig(this.checkUpdateApiCallBack2.bind(this))
    }

    private checkUpdateApiCallBack2(r: Receive) {
        if (r.code === 200) {
            if (this.progressTimer === null) this.startProgressTmer()
            this.nextDo = this.done.bind(this)
        } else {
            this.pauseProgressTmer()
            this.reDo = this.getConfig2.bind(this)
            this.alertBox.active = true
        }
    }

    private done() {
        director.loadScene('SignInScene')
    }

    onDestroy(): void {
        if (this.responseConfig != undefined) {
            this.responseConfig.abort()
        }

        if (this.responseCheckUpdate != undefined) {
            this.responseCheckUpdate.abort()
        }
    }

    private onReTry() {
        this.alertBox.active = false
        setTimeout(this.reDo.bind(this), 3000)
    }

    // 重置时间方法
    private resetProgressTimer() {
        this.progress = 0
        clearInterval(this.progressTimer)
        this.progressTimer = null
    }

    private pauseProgressTmer() {
        clearInterval(this.progressTimer)
        this.progressTimer = null
    }

    private startProgressTmer() {
        this.progressTimer = setInterval(() => {
            if (this.progress < 1) {
                this.progress += 0.01
            } else {
                this.progress = 1
                clearInterval(this.progressTimer)
                this.progressTimer = null
                this.nextDo()
            }
            this.ProgressBar.getComponent(ProgressBar).progress = this.progress
            this.progressLabel.getComponent(RichText).string = utils.setRichText((this.progress * 100).toFixed(2) + '%', '#0fffff')
        }, 10)
    }
}

