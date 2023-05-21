
import { _decorator, Component, Label, log, Node, RichText, Sprite, SpriteFrame } from 'cc';
import { utils } from '../../Common/Utils';
import { Box } from './Box';
const { ccclass, property } = _decorator;


@ccclass('Tetris')
export class Tetris extends Component {
    @property(Node)
    private gameNode: Node

    @property(Node)
    private nextNode: Node

    @property(Node)
    private timerNode: Node

    @property(Node)
    private scoreNode: Node

    @property(Node)
    private leaveNode: Node

    @property(Label)
    private buttonStartLabel: Label

    @property([SpriteFrame])
    private picturess: SpriteFrame[] = []
    private isDisabled: boolean = false

    private gameData: number[][] = []

    private gameTimer: number = 0
    private downTimer: number = 0
    private gameTime: number = 0
    private downTime: number = 0

    private nextBox: Box
    private currBox: Box

    private scoreNumber: number = 0


    start(): void {
        this.initData()

    }

    private initData(): void {
        this.gameData = []

        this.resetData(this.gameData, this.gameNode)

        this.nextBox = new Box()
        this.currBox = new Box()

        this.timerNode.getComponent(Label).string = '00:00:00'
        this.scoreNode.getComponent(RichText).string = utils.setRichText('0', '00ff00')
        this.leaveNode.getComponent(Label).string = '1'

        clearInterval(this.gameTimer)
        clearInterval(this.downTimer)

        this.gameTimer = null
        this.downTimer = null

        this.gameTime = 0
        this.downTime = 1500

        this.setData()
        this.renewNode(this.gameData, this.gameNode)
        this.renewNode(this.nextBox.data, this.nextNode)
    }

    private isGameOveer() {
        for (let x = 0; x < this.gameData[0].length; x++) {
            if (this.gameData[0][x] === 2) {
                return true
            }
        }
        return false
    }



    private down() {
        let moveData = this.currBox.getDownData()
        if (this.isCanMoveData(moveData.data, moveData.origin)) {
            this.clearData()
            this.currBox.down()
            this.setData()
            this.renewNode(this.gameData, this.gameNode)
        } else {
            this.landing()
        }

    }

    private left() {
        let moveData = this.currBox.getLeftData()
        if (this.isCanMoveData(moveData.data, moveData.origin)) {
            this.clearData()
            this.currBox.left()
            this.setData()
            this.renewNode(this.gameData, this.gameNode)
        }

    }

    private right() {
        let moveData = this.currBox.getRightData()
        if (this.isCanMoveData(moveData.data, moveData.origin)) {
            this.clearData()
            this.currBox.right()
            this.setData()
            this.renewNode(this.gameData, this.gameNode)
        }
    }

    private rotation() {
        let moveData = this.currBox.getRotationData()
        if (this.isCanMoveData(moveData.data, moveData.origin)) {
            this.clearData()
            this.currBox.rotation()
            this.setData()
            this.renewNode(this.gameData, this.gameNode)
        }
    }

    private renewNode(data: number[][], node: Node) {
        for (let i = 0; i < data.length; i++) {
            let children = node.children[i].children
            for (let j = 0; j < data[i].length; j++) {
                if (data[i][j] === 0) {
                    children[j].getComponent(Sprite).spriteFrame = this.picturess[0]
                } else if (data[i][j] === 1) {
                    children[j].getComponent(Sprite).spriteFrame = this.picturess[4]
                } else {
                    children[j].getComponent(Sprite).spriteFrame = this.picturess[3]
                }
            }
        }
    }

    private isValidPoint(origin: { x: number, y: number }, x: number, y: number) {
        if (origin.x + x < 0) {
            return false
        } else if (origin.y < 0) {
            return false
        } else if (origin.x + x >= this.gameData[0].length) {
            return false
        } else if (origin.y + y >= this.gameData.length) {
            return false
        } else if (this.gameData[y + origin.y][x + origin.x] === 2) {
            return false
        } else {
            return true
        }
    }

    private isCanMoveData(data: number[][], origin: { x: number, y: number }) {
        for (let y = 0; y < data.length; y++) {
            for (let x = 0; x < data[y].length; x++) {
                if (!this.isValidPoint(origin, x, y) && data[y][x] !== 0) {
                    return false
                }
            }
        }
        return true
    }

    private clearData() {
        for (let y = 0; y < this.currBox.data.length; y++) {
            for (let x = 0; x < this.currBox.data[y].length; x++) {
                if (this.isValidPoint(this.currBox.origin, x, y))
                    this.gameData[y + this.currBox.origin.y][x + this.currBox.origin.x] = 0
            }
        }
    }

    private setData() {
        for (let y = 0; y < this.currBox.data.length; y++) {
            for (let x = 0; x < this.currBox.data[y].length; x++) {
                if (this.isValidPoint(this.currBox.origin, x, y)) {
                    this.gameData[y + this.currBox.origin.y][x + this.currBox.origin.x] = this.currBox.data[y][x]
                }
            }
        }
    }

    private gameOverAnimation(data: number[][], node: Node): void {
        let i = data.length - 1
        let gameTimer = setInterval(function () {
            let children = node.children[i].children
            for (let j = 0; j < children.length; j++) {
                children[j].getComponent(Sprite).spriteFrame = this.picturess[3]
            }
            if (i <= 0) {
                clearInterval(gameTimer)
                gameTimer = null
                this.isDisabled = false
            } else {
                i--
                this.isDisabled = true
            }
        }.bind(this), 50)
    }

    private landing() {
        for (let y = 0; y < this.currBox.data.length; y++) {
            for (let x = 0; x < this.currBox.data[y].length; x++) {
                if (this.isValidPoint(this.currBox.origin, x, y) && this.gameData[y + this.currBox.origin.y][x + this.currBox.origin.x] === 1) {
                    this.gameData[y + this.currBox.origin.y][x + this.currBox.origin.x] = 2
                }
            }
        }

        if (this.isGameOveer()) {
            clearInterval(this.gameTimer)
            clearInterval(this.downTimer)
            this.gameTimer = null
            this.downTimer = null
            this.gameOverAnimation(this.gameData, this.gameNode)
            this.gameOverAnimation(this.nextBox.data, this.nextNode)
        } else {
            this.remove()
            this.currBox = this.nextBox
            this.nextBox = new Box()
            this.setData()
        }

        this.renewNode(this.gameData, this.gameNode)
        this.renewNode(this.nextBox.data, this.nextNode)
    }

    private remove() {
        let y = this.gameData.length - 1
        let count = 0

        while (y > this.currBox.origin.y) {
            let isCanRemove = true
            for (let x = 0; x < this.gameData[y].length; x++) {
                if (this.gameData[y][x] !== 2) {
                    isCanRemove = false
                }
            }
            if (isCanRemove) {
                count++
                let newData: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                this.gameData.splice(y, 1)
                this.gameData.splice(0, 0, newData)
            } else {
                y--
            }
        }

        if (count > 0) {
            this.score(count)
        }
    }



    private score(number: number) {
        let score = 100 * number * number
        this.scoreNumber += score
        this.scoreNode.getComponent(RichText).string = utils.setRichText(this.scoreNumber.toString(), '00ff00')
        let newLeave = '1'

        if (this.scoreNumber >= 3200) {
            newLeave = '7'
            this.downTime = 20
        } else if (this.scoreNumber >= 1600) {
            newLeave = '6'
            this.downTime = 50
        } else if (this.scoreNumber >= 800) {
            newLeave = '5'
            this.downTime = 100
        } else if (this.scoreNumber >= 400) {
            newLeave = '4'
            this.downTime = 200
        } else if (this.scoreNumber >= 200) {
            newLeave = '3'
            this.downTime = 500
        } else if (this.scoreNumber >= 100) {
            newLeave = '2'
            this.downTime = 1000
        }

        if (newLeave !== this.leaveNode.getComponent(Label).string) {
            this.leaveNode.getComponent(Label).string = newLeave
            clearInterval(this.downTimer)
            this.downTimer = null
            this.downTimer = setInterval(this.down.bind(this), this.downTime)
        }
    }

    private startGameTimer() {
        this.gameTime++

        let minutes = '0'
        let seconds = '0'
        let hours = '0'

        if (this.gameTime % 60 < 10) {
            seconds = '0' + this.gameTime % 60
        } else {
            seconds = this.gameTime % 60 + ''
        }

        if (Math.floor(this.gameTime / 60) % 60 < 10) {
            minutes = '0' + Math.floor(this.gameTime / 60)
        } else {
            minutes = Math.floor(this.gameTime / 60) + ''
        }

        if (Math.floor(this.gameTime / 3600) < 10) {
            hours = '0' + Math.floor(this.gameTime / 3600)
        } else if (Math.floor(this.gameTime / 60) < 60) {
            hours = Math.floor(this.gameTime / 3600) + ''
        }

        this.timerNode.getComponent(Label).string = hours + ':' + minutes + ':' + seconds
    }

    /**
     * 
     * @param data 要重置的数据：number[][]
     * @param node 要重置的样式
     */
    private resetData(data: number[][], node: Node) {
        for (let i = 0; i < node.children.length; i++) {
            let childNode = node.children[i]
            let childData: number[] = []
            for (let j = 0; j < childNode.children.length; j++) {
                childData.push(0)
                childNode.children[j].getComponent(Sprite).spriteFrame = this.picturess[0]
            }
            data.push(childData)
        }
    }

    private onStart() {
        if (this.buttonStartLabel.getComponent(Label).string === '开始' && this.downTimer === null) {
            this.gameTimer = setInterval(this.startGameTimer.bind(this), 1000)
            this.downTimer = setInterval(this.down.bind(this), this.downTime)
            this.buttonStartLabel.getComponent(Label).string = '暂停'
        } else if (this.buttonStartLabel.getComponent(Label).string === '暂停' && this.downTimer !== null) {
            clearInterval(this.gameTimer)
            clearInterval(this.downTimer)
            this.gameTimer = null
            this.downTimer = null
            this.buttonStartLabel.getComponent(Label).string = '开始'
        }
    }

    private onDownFast() {
        if (!this.isGameOveer() && this.buttonStartLabel.getComponent(Label).string === '暂停') {
            for (let y = this.currBox.origin.y; y < this.gameData.length; y++) {
                let moveData = this.currBox.getDownData()
                if (this.isCanMoveData(moveData.data, moveData.origin)) {
                    this.clearData()
                    this.currBox.down()
                    this.setData()
                    this.renewNode(this.gameData, this.gameNode)
                    this.renewNode(this.nextBox.data, this.nextNode)
                } else {
                    this.landing()
                    this.renewNode(this.gameData, this.gameNode)
                    this.renewNode(this.nextBox.data, this.nextNode)
                    return
                }
            }
        }
    }

    private onDownSlow() {
        if (!this.isGameOveer() && this.buttonStartLabel.getComponent(Label).string === '暂停' && !this.isDisabled) {
            this.down()
        }
    }

    private onReset() {
        if (!this.isDisabled) {
            this.initData()
            this.gameTimer = setInterval(this.startGameTimer.bind(this), 1000)
            this.downTimer = setInterval(this.down.bind(this), this.downTime)
            this.buttonStartLabel.getComponent(Label).string = '暂停'
        }
    }

    private onLeft() {
        if (!this.isGameOveer() && this.buttonStartLabel.getComponent(Label).string === '暂停' && !this.isDisabled) {
            this.left()
        }
    }

    private onRight() {
        if (!this.isGameOveer() && this.buttonStartLabel.getComponent(Label).string === '暂停' && !this.isDisabled) {
            this.right()
        }
    }

    private onRotation() {
        if (!this.isGameOveer() && this.buttonStartLabel.getComponent(Label).string === '暂停' && !this.isDisabled) {
            this.rotation()
        }
    }

}



