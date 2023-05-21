

class Utils {
    private static _instance: Utils = null
    constructor() {

    }

    static getInstance() {
        if (!this._instance) {
            this._instance = new Utils()
        }
        return this._instance
    }

    /**
     * 
     * @param text 文本的内容
     * @param color 问厄本的颜色
     * @returns 
     */
    public setRichText(text: string, color: string = "#FFFFFF") {
        return '<color=' + color + '>' + text + '</color>'
    }

    /**
     * 
     * @param min 含最小值
     * @param max 不含最大值
     * @returns 
     */
    public getRandom(min: number, max: number): number {
        min = Math.ceil(min)
        max = Math.floor(max)
        let number = Math.floor(Math.random() * (max - min)) + min
        return number

    };
}

export let utils: Utils = Utils.getInstance()


