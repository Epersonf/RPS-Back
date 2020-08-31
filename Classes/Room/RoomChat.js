export class Chat {
    constructor(room) {
        this.room = room;
        this.log = [];
    }

    addMessage(id, token, msg) {
        const player = this.room.players[id];
        if (player.token != token) return false;
        this.broadcastMessage(player.name + ': ' + msg);  
        return true;
    }

    broadcastMessage(msg) {
        this.log.push(msg);
        if (this.log.length > 20) {
            this.log.splice(0, 1);
        }
    }
}