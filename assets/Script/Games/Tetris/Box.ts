import { utils } from "../../Common/Utils"

export class Box {
    constructor() {
        this.getData()
    }

    private s1 = [
        [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
        ],

        [
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ],

        [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
        ],

        [
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ],
    ]

    private s2 = [
        [
            [1, 1, 0, 0],
            [1, 1, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ],

        [
            [1, 1, 0, 0],
            [1, 1, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ],

        [
            [1, 1, 0, 0],
            [1, 1, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ],

        [
            [1, 1, 0, 0],
            [1, 1, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ],
    ]

    private s3 = [
        [
            [1, 0, 0, 0],
            [1, 1, 1, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ],

        [
            [1, 1, 0, 0],
            [1, 0, 0, 0],
            [1, 0, 0, 0],
            [0, 0, 0, 0],
        ],

        [
            [1, 1, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ],

        [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [1, 1, 0, 0],
            [0, 0, 0, 0],
        ],
    ]

    private s4 = [
        [
            [0, 0, 1, 0],
            [1, 1, 1, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ],

        [
            [1, 0, 0, 0],
            [1, 0, 0, 0],
            [1, 1, 0, 0],
            [0, 0, 0, 0],
        ],

        [
            [1, 1, 1, 0],
            [1, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ],

        [
            [1, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0],
        ],
    ]

    private s5 = [
        [
            [1, 0, 0, 0],
            [1, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0],
        ],

        [
            [0, 1, 1, 0],
            [1, 1, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ],

        [
            [1, 0, 0, 0],
            [1, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0],
        ],

        [
            [0, 1, 1, 0],
            [1, 1, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ],
    ]

    private s6 = [
        [
            [0, 1, 0, 0],
            [1, 1, 0, 0],
            [1, 0, 0, 0],
            [0, 0, 0, 0],
        ],

        [
            [1, 1, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ],

        [
            [0, 1, 0, 0],
            [1, 1, 0, 0],
            [1, 0, 0, 0],
            [0, 0, 0, 0],
        ],

        [
            [1, 1, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ],
    ]

    private s7 = [
        [
            [0, 1, 0, 0],
            [1, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0],
        ],

        [
            [0, 1, 0, 0],
            [1, 1, 1, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ],

        [
            [1, 0, 0, 0],
            [1, 1, 0, 0],
            [1, 0, 0, 0],
            [0, 0, 0, 0],
        ],

        [
            [1, 1, 1, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ],
    ]

    public origin = {
        x: 0,
        y: 0,
    }
    private styleData: number[][][] = []
    public data: number[][] = []
    public angle: number = 0

    public getData() {
        let style = utils.getRandom(1, 8)
        switch (style) {
            case 1:
                this.styleData = [...this.s1]
                break
            case 2:
                this.styleData = [...this.s2]
                break
            case 3:
                this.styleData = [...this.s3]
                break
            case 4:
                this.styleData = [...this.s4]
                break
            case 5:
                this.styleData = [...this.s5]
                break
            case 6:
                this.styleData = [...this.s6]
                break
            case 7:
                this.styleData = [...this.s7]
                break
            default:
                break
        }

        this.angle = utils.getRandom(0, 4)
        this.data = [...this.styleData[this.angle % 4]]
        this.origin.x = 3
        this.origin.y = 0
    }

    public getDownData() {
        let moveData: MoveData = {
            data: [],
            origin: {
                x: 0,
                y: 0,
            }
        }
        moveData.data = [...this.data]
        moveData.origin = {
            x: this.origin.x,
            y: this.origin.y + 1
        }
        return moveData
    }
    public down() {
        this.origin.y++
    }

    public getLeftData() {
        let moveData: MoveData = {
            data: [],
            origin: {
                x: 0,
                y: 0,
            }
        }
        moveData.data = [...this.data]
        moveData.origin = {
            x: this.origin.x - 1,
            y: this.origin.y
        }
        return moveData
    }
    public left() {
        this.origin.x--
    }

    public getRightData() {
        let moveData: MoveData = {
            data: [],
            origin: {
                x: 0,
                y: 0,
            }
        }
        moveData.data = [...this.data]
        moveData.origin = {
            x: this.origin.x + 1,
            y: this.origin.y
        }
        return moveData
    }
    public right() {
        this.origin.x++
    }

    public getRotationData() {
        let moveData: MoveData = {
            data: [],
            origin: {
                x: 0,
                y: 0,
            }
        }
        let angle = (this.angle + 1) % 4
        moveData.data = [...this.styleData[angle]]
        moveData.origin = {
            x: this.origin.x,
            y: this.origin.y
        }
        return moveData
    }
    public rotation() {
        this.angle++
        this.data = [...this.styleData[this.angle % 4]]
    }
}



type MoveData = {
    data: number[][],
    origin: {
        x: number,
        y: number,
    }
}