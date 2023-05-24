import { config } from "../Global/Config"
import { Md5 } from "./Md5"

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

    public encrypt(key: string) {
        const salt = config.salt
        // var encrypt = CryptoJS.AES.encrypt(key, CryptoJS.enc.Utf8.parse(aseKey), {
        //     mode: CryptoJS.mode.ECB,
        //     padding: CryptoJS.pad.Pkcs7
        // }).toString();
        // return encrypt

        return Md5.hashStr(key + salt)
    }

    public decrypt(key: string) {
        // const aseKey = config.salt

        // //解密
        // var decrypt = CryptoJS.AES.decrypt(key, CryptoJS.enc.Utf8.parse(aseKey), {
        //     mode: CryptoJS.mode.ECB,
        //     padding: CryptoJS.pad.Pkcs7
        // }).toString(CryptoJS.enc.Utf8);
        // return decrypt
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


