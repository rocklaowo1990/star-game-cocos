import { Player, userInfo } from "../../../Script";

export default function renewSeat(players: Player[]): Player[] {
    let uid = userInfo.uid
    let _players = [...players]

    let i = 1
    while (i < _players.length) {
        if (_players[i].uid === uid) {
            let newPlayers = _players.splice(i, _players.length - i)
            return newPlayers.concat(_players)
        } else {
            i++
        }
    }
    return _players
}