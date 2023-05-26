import { _decorator, Component, Node, Animation } from 'cc'
const { ccclass, property } = _decorator

@ccclass('LoadingManager')
export class LoadingManager extends Component {
    @property(Node)
    private animationBox: Node

    start() {
        this.animationBox.getComponent(Animation).play()
    }

    update(deltaTime: number) {

    }
}

