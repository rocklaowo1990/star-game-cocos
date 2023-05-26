import _Player from "./Interface/Player"
import _Room from "./Interface/Room"
import _Response from './Interface/Response'
import _Receive from './Interface/Receive'

export type Player = _Player
export let player = new _Player()

export type Room = _Room
export let room = new _Room()

export type Response = _Response
export let response = new _Response()

export type Receive = _Receive
export let receive = new _Receive()

////////////////////////////////////////////////////////////////////////////////

import _Config from './Global/Config'
import _UserInfo from './Global/UserInfo'
import _WebSocketClient from './Global/WebSocketClient'



export type Config = _Config
export let config = new _Config()

export type UserInfo = _UserInfo
export let userInfo = _UserInfo.getInstance()

export type WebSocketClient = _WebSocketClient
export let webSocketClient = _WebSocketClient.getInstance()

////////////////////////////////////////////////////////////////////////////////

import _HttpModule from './Common/HttpModule'
import _Md5 from './Common/Md5'
import _WsModule from './Common/WSModule'
import _Utils from './Common/Utils'




export type HttpModule = _HttpModule
export let httpModule = _HttpModule.getInstance()

export let Md5 = _Md5
export let md5: _Md5

export type WsModule = _WsModule
export let wsModule = _WsModule.getInstance()

export type Utils = _Utils
export let utils = _Utils.getInstance()

////////////////////////////////////////////////////////////////////////////////

import _ConfigApi from './Api/ConfigApi'
import _RoomApi from './Api/RoomApi'
import _UserApi from './Api/UserApi'


export let configApi = _ConfigApi.getInstance()
export let roomApi = _RoomApi.getInstance()
export let userApi = _UserApi.getInstance()









