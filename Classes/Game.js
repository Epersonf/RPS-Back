import { Table } from './Table.js';

export class Game {
    constructor () {
        this.tables = [];
    }

    createTable() {
        const tableId = this.tables[this.tables.length - 1].id + 1;
        this.tables.push(new Table(tableId, this));
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
}