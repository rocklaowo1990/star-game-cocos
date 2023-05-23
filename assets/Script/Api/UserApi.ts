import { httpModule } from "../Common/HttpModule"

export class UserApi {
    private static _instance: UserApi = null
    constructor() {

    }

    static getInstance() {
        if (!this._instance) {
            this._instance = new UserApi()
        }
        return this._instance
    }



    public signin(data: {
        account: string;
        password: string;
        callBack: Function;
        invitationCcode?: string;
    }) {
        let url = '/user/signin'
        let params = 'account=' + data.account + '&password=' + data.password
        let response = httpModule.get(url, data.callBack, params)
        return response
    }

    public signup(data: {
        account: string;
        password: string;
        callBack: Function;
        invitationCcode?: string;
    }) {
        let url = '/user/signup'
        let params = 'account=' + data.account + '&password=' + data.password
        if (data.invitationCcode != undefined || data.invitationCcode != null || data.invitationCcode != '') params += '&invitationCcode=' + data.invitationCcode
        let response = httpModule.post(url, data.callBack, params)
        return response
    }
}

export let userApi: UserApi = UserApi.getInstance()


