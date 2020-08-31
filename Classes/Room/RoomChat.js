export class Chat {
    constructor(room) {
        this.room = room;
        this.log = [];
    }

    addMessage(id, token, msg) {
        const player = this.room.players[id];
        if (player.token != token) return false;
        this.log.push(player.name + ': ' + msg);
        if (this.log.length > 20) {
            this.log.splice(0, 1);
        }
        return true;
    }
}