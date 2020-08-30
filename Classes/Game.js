import { Room } from './Room.js';

export class Game {
    constructor () {
        this.tables = [];
    }

    update() {
        this.tables.forEach((e) => e.update());
    }

    createTable(maxAmountOfPlayers=4, name, password, playerName) {
        let tableId = 0;
        if (this.tables.length > 0)
            tableId = this.tables[this.tables.length - 1].id + 1;
        
        let newTable = new Room(tableId, this, maxAmountOfPlayers, name, password, playerName);
        this.tables.push(newTable);
        return newTable;
    }

    removeTable(id) {
        for (let i in this.tables) {
            const table = this.tables[i];
            if (table.id == id) {
                this.tables.splice(i, 1);
                break;
            }
        }
    }

    getRoom(id) {
        for (let i in this.tables) {
            if (this.tables[i].id == id) return this.tables[i];
        }
        return false;
    }

    tablesJson() {
        let build = [];
        this.tables.forEach((e) => build.push(e.json()));
        return build;
    }
}