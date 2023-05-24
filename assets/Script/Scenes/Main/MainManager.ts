import { _decorator, Component, director, Node, ProgressBar } from 'cc';
import { configApi } from '../../Api/ConfigApi';
import { ResponseData } from '../../Common/HttpModule';
import { config } from '../../Global/Config';
import { webSocketClient } from '../../Global/WebSocketClient';
const { ccclass, property } = _decorator;

@ccclass('MainManager')
export class MainManager extends Component {
    private responseConfig: XMLHttpRequest

    @property(Node)
    private ProgressBar: Node

    @property(Node)
    private alertBox: Node

    private progress: number
    private progressTimer: number
    private isGetDoun: boolean
    private isLoadingAssetsDone: boolean


    start() {
        this.init()
        this.getConfig()
        this.progressTimerStart()
    }

    private init() {
        this.progress = 0
        clearInterval(this.progressTimer)
        this.progressTimer = null
        this.isGetDoun = false
        this.isLoadingAssetsDone = false
    }

    private progressTimerStart() {
        this.progressTimer = setInterval(this.loadingAssets.bind(this), 10)
    }

    private loadingApi() {
        if (this.progress < 0.8) {
            this.progress += 0.01
            this.ProgressBar.getComponent(ProgressBar).progress = this.progress
        } else {
            clearInterval(this.progressTimer)
            this.progressTimer = null
            let tryTime = 0
            let loadingApiTimer = setInterval(function () {
                if (this.isGetDoun) {
                    clearInterval(loadingApiTimer)
                    loadingApiTimer = null
                    this.progressTimer = setInterval(this.loadingFinished.bind(this), 10)
                } else {
                    if (tryTime < 10) {
                        this.getConfig()
                    } else {
                        clearInterval(loadingApiTimer)
                        loadingApiTimer = null
                        this.alertBox.active = true
                    }
                    tryTime++
                }
            }.bind(this), 500)
        }
    }

    private loadingFinished() {
        if (this.progress < 1) {
            this.progress += 0.01
            this.ProgressBar.getComponent(ProgressBar).progress = this.progress
        } else {
            this.progress = 1
            this.ProgressBar.getComponent(ProgressBar).progress = this.progress

            clearInterval(this.progressTimer)
            this.progressTimer = null

            director.loadScene("SignInScene")
        }
    }

    private loadingAssets() {
        if (this.progress < 0.4) {
            this.progress += 0.01
            this.ProgressBar.getComponent(ProgressBar).progress = this.progress
        } else {
            clearInterval(this.progressTimer)
            this.progressTimer = null
            this.progressTimer = setInterval(this.loadingApi.bind(this), 10)
        }
    }

    update(deltaTime: number) {

    }

    onDestroy(): void {
        if (this.responseConfig != undefined) {
            this.responseConfig.abort()
        }
    }

    private getConfig() {
        this.responseConfig = configApi.getConfig(this.getConfigCallback.bind(this))
    }

    private getConfigCallback(r: ResponseData) {
        if (r.status === 200 && r.data.code === 200) {
            config.parse(r.data.data)
            this.isGetDoun = true
        }
    }

    private onTry() {
        this.alertBox.active = false
        this.loadingApi()
    }
}

