import _Player from "./Interface/Player"
import _Room from "./Interface/Room"
import _Receive from './Interface/Receive'
import _WsReceive from './Interface/WsReceive'

export type Player = _Player
export let player = new _Player()

export type Room = _Room
export let room = new _Room()

export type Receive = _Receive
export let receive = new _Receive()

export type WsReceive = _WsReceive
export let wsReceive = new _WsReceive()

////////////////////////////////////////////////////////////////////////////////

import _Config from './Global/Config'
import _UserInfo from './Global/UserInfo'

export type Config = _Config
export let config = new _Config()

export type UserInfo = _UserInfo
export let userInfo = _UserInfo.getInstance()

////////////////////////////////////////////////////////////////////////////////

import _HttpModule from './Common/HttpModule'
import _Md5 from './Common/Md5'
import _WsModule from './Common/WSModule'
import _Utils from './Common/Utils'
import _Common from './Common/Common'


export type HttpModule = _HttpModule
export let httpModule = _HttpModule.getInstance()

export let Md5 = _Md5
export let md5: _Md5

export type WsModule = _WsModule
export let wsModule = _WsModule.getInstance()

export type Utils = _Utils
export let utils = _Utils.getInstance()

export type Common = _Common
export let common = _Common.getInstance()

////////////////////////////////////////////////////////////////////////////////

import _ConfigApi from './Api/ConfigApi'
import _RoomApi from './Api/RoomApi'
import _UserApi from './Api/UserApi'


export let configApi = _ConfigApi.getInstance()
export let roomApi = _RoomApi.getInstance()
export let userApi = _UserApi.getInstance()









