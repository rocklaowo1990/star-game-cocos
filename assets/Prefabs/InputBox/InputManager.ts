import { _decorator, Component, EditBox, Label, Node, } from 'cc'
const { ccclass, property } = _decorator

@ccclass('InputManager')
export class InputManager extends Component {
    @property(Label)
    private buttonLabel: Label

    @property(EditBox)
    private editBox: EditBox

    private isPassword: boolean = false

    protected start() {
        if (this.editBox.inputFlag === EditBox.InputFlag.PASSWORD) {
            this.buttonLabel.string = 'S'
            this.isPassword = true
        }
    }

    private onClick() {
        if (this.isPassword) {
            if (this.buttonLabel.string === 'S') {
                this.buttonLabel.string = 'H'
                this.editBox.inputFlag = EditBox.InputFlag.DEFAULT
            } else {
                this.buttonLabel.string = 'S'
                this.editBox.inputFlag = EditBox.InputFlag.PASSWORD
            }

        } else {
            this.editBox.string = ''
            this.editBox.focus()
        }
    }
}

